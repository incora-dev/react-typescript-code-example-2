import { Col, Row } from 'antd';
import { FormikProps, FormikProvider } from 'formik';
import { DatePicker, Form, Input, Select } from 'formik-antd';
import moment, { Moment } from 'moment';
import * as React from 'react';

import { IrregularityCategorySelect } from './IrregularityCategorySelect';
import { IrregularityFormValues } from 'modules/irregularity/hooks';
import { TYPE_TRANSLATIONS } from 'modules/irregularity/irregularity.constants';
import { trans } from 'translation';

interface IrregularityReporterFormProps {
  formik: FormikProps<IrregularityFormValues>;
  readOnly?: boolean;
}

export const IrregularityReporterForm = ({ formik, readOnly }: IrregularityReporterFormProps) => (
  <FormikProvider value={formik}>
    <Form id="irregularity-reporter-form" layout="vertical">
      <Row justify="start">
        <Col xs={{ span: 12 }}>
          <Form.Item name="irregularityDate" label={trans('irregularity.form.date')}>
            <DatePicker
              allowClear={false}
              name="irregularityDate"
              data-testid="irregularity-date"
              disabled={formik.isSubmitting || readOnly}
              disabledDate={(date: Moment) => date.isAfter(moment(), 'day')}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start">
        <Col xs={{ span: 10 }}>
          <Form.Item name="type" label={trans('irregularity.form.type')}>
            <Select data-testid="irregularity-type" disabled={formik.isSubmitting || readOnly} name="type">
              {Object.keys(TYPE_TRANSLATIONS).map(type => (
                <Select.Option key={type} value={type}>
                  {TYPE_TRANSLATIONS[type]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start">
        <Col xs={{ span: 10 }}>
          <Form.Item name="category" label={trans('irregularity.form.category')}>
            <IrregularityCategorySelect testId="reporter-category" disabled={formik.isSubmitting || readOnly} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }}>
          <Form.Item name="reporterDescription" label={trans('irregularity.form.description')}>
            <Input.TextArea
              disabled={formik.isSubmitting || readOnly}
              data-testid="reporter-description"
              name="reporterDescription"
              rows={6}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }}>
          <Form.Item name="reporterActions" label={trans('irregularity.form.actionsTaken')}>
            <Input.TextArea
              disabled={formik.isSubmitting || readOnly}
              data-testid="reporter-actions"
              name="reporterActions"
              rows={6}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </FormikProvider>
);
