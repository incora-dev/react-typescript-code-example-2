import { Select } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectIrregularitySubcategories } from 'modules/irregularity/irregularity.selectors';
import { trans } from 'translation';
import { Result } from 'utils/result';

interface SubcategoryFilterProps {
  onChange: (value: string) => void;
  value?: string;
}

export const SubcategoryFilter = ({ onChange, value }: SubcategoryFilterProps) => {
  const subcategories = useSelector(selectIrregularitySubcategories);

  return (
    <Select
      allowClear
      showSearch
      value={value}
      onChange={onChange}
      optionFilterProp="children"
      loading={Result.isLoading(subcategories)}
      placeholder={trans('irregularities.list.filter.subcategory.placeholder')}
    >
      {Result.isFulfilled(subcategories) &&
        subcategories.data.map(subcategory => (
          <Select.Option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </Select.Option>
        ))}
    </Select>
  );
};
