import { Col, Row } from 'antd';
import { FormikProps, FormikProvider } from 'formik';
import { Form, Input, Select } from 'formik-antd';
import { noop } from 'lodash';
import * as React from 'react';

import { IrregularityCategorySelect } from '../IrregularityReporterForm/IrregularityCategorySelect';
import { AssessorSelect } from './AssessorSelect';
import { IrregularitySubcategorySelect } from './IrregularitySubcategorySelect';
import { IrregularityAssessorFormValues } from 'modules/irregularity/hooks';
import { RISK_TRANSLATIONS } from 'modules/irregularity/irregularity.constants';
import { trans } from 'translation';

interface IrregularityAssessorFormProps {
  formik: FormikProps<IrregularityAssessorFormValues>;
  onAutoSave?: () => void;
  readOnly?: boolean;
}

export const IrregularityAssessorForm = ({ readOnly, formik, onAutoSave = noop }: IrregularityAssessorFormProps) => (
  <FormikProvider value={formik}>
    <Form id="irregularity-assessor-form" layout="vertical">
      <Row justify="start">
        <Col xs={{ span: 12 }}>
          <Form.Item name="assessorId" label={trans('irregularity.form.assessor')}>
            <AssessorSelect onBlur={onAutoSave} disabled={formik.isSubmitting || readOnly} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start">
        <Col xs={{ span: 12 }}>
          <Form.Item name="category" label={trans('irregularity.form.category')}>
            <IrregularityCategorySelect onBlur={onAutoSave} disabled={formik.isSubmitting || readOnly} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start">
        <Col xs={{ span: 6 }}>
          <Form.Item name="medicalRisk" label={trans('irregularity.form.medical.risk')}>
            <Select
              name="medicalRisk"
              onBlur={onAutoSave}
              data-testid="irregularity-risk"
              disabled={formik.isSubmitting || readOnly}
            >
              {Object.keys(RISK_TRANSLATIONS).map(risk => (
                <Select.Option key={risk} value={risk}>
                  {RISK_TRANSLATIONS[risk]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start">
        <Col xs={{ span: 12 }}>
          <Form.Item name="subcategoryId" label={trans('irregularity.form.subcategory')}>
            <IrregularitySubcategorySelect onBlur={onAutoSave} disabled={formik.isSubmitting || readOnly} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start">
        <Form.Item name="grade" label={trans('irregularity.form.grade')}>
          <Input
            min="0"
            max="5"
            name="grade"
            type="number"
            onBlur={onAutoSave}
            data-testid="assessor-grade"
            disabled={formik.isSubmitting || readOnly}
          />
        </Form.Item>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }}>
          <Form.Item name="comments" label={trans('irregularity.form.comments')}>
            <Input.TextArea
              rows={4}
              name="comments"
              onBlur={onAutoSave}
              data-testid="assessor-comments"
              disabled={formik.isSubmitting || readOnly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }}>
          <Form.Item name="assessment" label={trans('irregularity.form.assessment')}>
            <Input.TextArea
              rows={4}
              name="assessment"
              onBlur={onAutoSave}
              data-testid="assessor-assessment"
              disabled={formik.isSubmitting || readOnly}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }}>
          <Form.Item name="actions" label={trans('irregularity.form.actions')}>
            <Input.TextArea
              rows={4}
              name="actions"
              onBlur={onAutoSave}
              data-testid="assessor-actions"
              disabled={formik.isSubmitting || readOnly}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </FormikProvider>
);
