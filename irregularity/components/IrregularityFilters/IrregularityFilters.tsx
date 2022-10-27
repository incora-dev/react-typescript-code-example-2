import { Col, Row, DatePicker } from 'antd';
import moment from 'moment';
import * as React from 'react';

import { AssessorFilter } from './AssessorFilter';
import { CategoryFilter } from './CategoryFilter';
import { StatusFilter } from './StatusFilter';
import { SubcategoryFilter } from './SubcategoryFilter';
import { TypeFilter } from './TypeFilter';
import { useIrregularityListFilters } from 'modules/irregularity/hooks';

export const IrregularityFilters: React.FC = () => {
  const filters = useIrregularityListFilters();

  const onDateChange = React.useCallback(
    date => {
      if (date) {
        filters.date.set(date.format('YYYY-MM-DD'));
      } else {
        filters.date.set(undefined);
      }
    },
    [filters.date.set],
  );

  return (
    <Row gutter={12}>
      <Col xs={{ span: 5 }} md={{ span: 4 }} xxl={{ span: 2 }}>
        <DatePicker
          onChange={onDateChange}
          disabledDate={date => date.isAfter(moment(), 'day')}
          value={filters.date.value ? moment(filters.date.value) : undefined}
        />
      </Col>
      <Col xs={{ span: 6 }} md={{ span: 4 }} xxl={{ span: 3 }}>
        <AssessorFilter onChange={filters.assessor.set} value={filters.assessor.value} />
      </Col>
      <Col xs={{ span: 5 }} md={{ span: 4 }} xxl={{ span: 2 }}>
        <CategoryFilter onChange={filters.category.set} value={filters.category.value} />
      </Col>
      <Col xs={{ span: 8 }} md={{ span: 5 }}>
        <SubcategoryFilter onChange={filters.subcategory.set} value={filters.subcategory.value} />
      </Col>
      <Col xs={{ span: 5 }} md={{ span: 3 }} xxl={{ span: 2 }}>
        <TypeFilter onChange={filters.type.set} value={filters.type.value} />
      </Col>
      <Col xs={{ span: 5 }} md={{ span: 3 }} xxl={{ span: 2 }}>
        <StatusFilter onChange={filters.status.set} value={filters.status.value} />
      </Col>
    </Row>
  );
};
