import { Alert, Button, Col, Row, Space, Spin, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { IrregularityHeader } from './IrregularityHeader';
import { Centered } from 'clinic-ui/grid';
import { Page } from 'clinic-ui/Page';
import { PreventRouteChange } from 'modules/core/app/components/PreventRouteChange';
import { IrregularityAssessorForm } from 'modules/irregularity/components/IrregularityAssessorForm';
import { IrregularityReporterForm } from 'modules/irregularity/components/IrregularityReporterForm';
import {
  useIrregularity,
  useIrregularityForm,
  IrregularityFormValues,
  useIrregularityAssessorForm,
  IrregularityAssessorFormValues,
} from 'modules/irregularity/hooks';
import { IrregularityStatus } from 'modules/irregularity/irregularity.types';
import { trans } from 'translation';
import { Result } from 'utils/result';

const ReadOnlyFields = styled(Col)`
  .ant-select-disabled .ant-select-arrow {
    display: none;
  }

  .ant-select-disabled .ant-select-selection-item,
  .ant-input[disabled],
  input[disabled] {
    color: rgba(0, 0, 0, 0.65);
    cursor: initial;
    resize: none;
  }
`;

const READ_ONLY_STATUSES = new Set([IrregularityStatus.CLOSED, IrregularityStatus.NEW]);

export const Irregularity = () => {
  const { irregularityId } = useParams<{ irregularityId: string }>();
  const [irregularity] = useIrregularity(irregularityId);
  const [autoSavedAt, setAutoSavedTimestamp] = React.useState<number>();

  const [reporterFormik] = useIrregularityForm((irregularity as unknown) as IrregularityFormValues, '');
  const [assessorFormik, { onSave, onAutoSave, savingResult, lockingResult }] = useIrregularityAssessorForm(
    (irregularity as unknown) as IrregularityAssessorFormValues,
  );

  React.useEffect(() => {
    if (Result.isFulfilled(savingResult) && !assessorFormik.status?.autoSave) {
      setAutoSavedTimestamp(Date.now());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessorFormik.status?.autoSave, savingResult.status]);

  if (!irregularity) {
    return (
      <Centered>
        <Spin size="large" />
      </Centered>
    );
  }

  const readOnly = READ_ONLY_STATUSES.has(irregularity.status);

  return (
    <Page>
      <IrregularityHeader irregularity={irregularity} />
      <Col span={24}>
        <Row gutter={[0, 16]}>
          <ReadOnlyFields
            xs={{ span: 24 }}
            md={{ span: 18, offset: 3 }}
            xl={{ span: 10, offset: 1 }}
            xxl={{ span: 8, offset: 2 }}
          >
            <IrregularityReporterForm readOnly formik={reporterFormik} />
          </ReadOnlyFields>
          <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }} xl={{ span: 10, offset: 1 }} xxl={{ span: 8, offset: 2 }}>
            <IrregularityAssessorForm readOnly={readOnly} onAutoSave={onAutoSave as any} formik={assessorFormik} />
            <Col span="24">
              {(Result.isFailure(savingResult) || Result.isFailure(lockingResult)) && (
                <Alert data-testid="handover-error" type="error" message={trans('general.error')} showIcon />
              )}
            </Col>
            {!readOnly && (
              <Col span="24">
                <Row justify="end">
                  <Space>
                    {autoSavedAt && (
                      <Typography.Text type="secondary">
                        {trans('irregularity.form.saved.at', { time: moment(autoSavedAt).format('HH:mm:ss') })}
                      </Typography.Text>
                    )}
                    <Button
                      onClick={onSave}
                      disabled={assessorFormik.isSubmitting}
                      loading={assessorFormik.status?.autoSave || assessorFormik.status?.save}
                    >
                      {trans('irregularity.form.submit')}
                    </Button>
                    <Button
                      data-testid="irregularity-assessor-form-lock"
                      loading={assessorFormik.isSubmitting}
                      form="irregularity-assessor-form"
                      htmlType="submit"
                      type="primary"
                    >
                      {trans('irregularity.form.close')}
                    </Button>
                  </Space>
                </Row>
              </Col>
            )}
          </Col>
        </Row>
      </Col>
      <PreventRouteChange enabled={assessorFormik.dirty} message={trans('form.warning.unsaved_notes')} />
    </Page>
  );
};
