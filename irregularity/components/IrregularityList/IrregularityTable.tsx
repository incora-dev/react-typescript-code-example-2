import { Typography } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router';
import { AutoSizer } from 'react-virtualized';

import { IrregularityStatusTag } from '../IrregularityStatusTag';
import { Table, useTablePagination } from 'clinic-ui/Table';
import { STATIC_ROUTES } from 'modules/app/router';
import { useIrregularities } from 'modules/irregularity/hooks/useIrregularities';
import { updatePaginationAction } from 'modules/irregularity/irregularity.actions';
import { CATEGORY_TRANSLATIONS, TYPE_TRANSLATIONS } from 'modules/irregularity/irregularity.constants';
import { selectIrregularityFilters, selectIrregularityPagination } from 'modules/irregularity/irregularity.selectors';
import { Irregularity } from 'modules/irregularity/irregularity.types';
import { Practitioner } from 'modules/practitioner/components/PractitionerId';
import { trans } from 'translation';

const COLUMNS = [
  {
    title: trans('irregularities.list.date'),
    render: (_: string, irregularity: Irregularity) => moment(irregularity.irregularityDate).format('YYYY-MM-DD'),
  },
  {
    title: trans('irregularities.list.assessor'),
    render: (_: string, irregularity: Irregularity) => (
      <Practitioner externalId practitionerId={irregularity?.assessorId}>
        <Practitioner.Name />
      </Practitioner>
    ),
  },
  {
    title: trans('irregularities.list.category'),
    render: (_: string, irregularity: Irregularity) => (
      <Typography.Text>{CATEGORY_TRANSLATIONS[irregularity.category]}</Typography.Text>
    ),
  },
  {
    title: trans('irregularities.list.subcategory'),
    render: (_: string, irregularity: Irregularity) =>
      irregularity.subcategory ? <Typography.Text>{irregularity.subcategory.name}</Typography.Text> : '-',
  },
  {
    title: trans('irregularities.list.type'),
    render: (_: string, irregularity: Irregularity) => (
      <Typography.Text>{TYPE_TRANSLATIONS[irregularity.type]}</Typography.Text>
    ),
  },
  {
    title: trans('irregularities.list.status'),
    render: (_: string, irregularity: Irregularity) => <IrregularityStatusTag status={irregularity.status} />,
  },
];

export const IrregularityTable: React.FC = () => {
  const history = useHistory();
  const [irregularities, { refetch }] = useIrregularities();

  const filters = useSelector(selectIrregularityFilters);
  const paginationData = useSelector(selectIrregularityPagination, shallowEqual);
  const pagination = useTablePagination(paginationData, updatePaginationAction);

  const onRow = React.useCallback(
    (irregularity: Irregularity) => ({
      onClick: () => {
        history.push(`${STATIC_ROUTES.irregularities}/${irregularity.id}`);
      },
    }),
    [history],
  );

  React.useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, pagination.current, pagination.size]);

  React.useEffect(() => {
    if (isEmpty(filters)) {
      return;
    }

    refetch();
  }, [refetch, filters]);

  return (
    <div style={{ height: 'calc(100vh - 290px)', width: '100%' }}>
      <AutoSizer style={{ width: '100%' }}>
        {({ height }) => (
          <Table
            rowKey="id"
            onRow={onRow}
            columns={COLUMNS}
            scroll={{ y: height }}
            pagination={pagination}
            dataSource={irregularities}
          />
        )}
      </AutoSizer>
    </div>
  );
};
