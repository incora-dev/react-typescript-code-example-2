import { Col } from 'antd';
import * as React from 'react';

import { IrregularityFilters } from '../IrregularityFilters';
import { IrregularityTable } from './IrregularityTable';
import { Page } from 'clinic-ui/Page';
import { trans } from 'translation';

export const IrregularityList = () => {
  return (
    <>
      <Page title={trans('irregularities')}>
        <Col span={24}>
          <IrregularityFilters />
        </Col>

        <Col span={24}>
          <IrregularityTable />
        </Col>
      </Page>
    </>
  );
};
