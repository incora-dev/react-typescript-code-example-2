import { Select } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { Category, useDirectoryText } from 'modules/app/directory/useDirectoryText';
import { IrregularityCategory } from 'modules/irregularity/irregularity.types';
import { trans } from 'translation';
import { Result } from 'utils/result';

interface CategoryFilterProps {
  onChange: (value: string) => void;
  value?: IrregularityCategory;
}

const Capitalized = styled.span`
  text-transform: capitalize;
`;

export const CategoryFilter = ({ onChange, value }: CategoryFilterProps) => {
  const categories = useDirectoryText(Category.irregularity);

  const options = React.useMemo(() => {
    if (!Result.isFulfilled(categories)) {
      return [];
    }

    return Object.entries(categories.data).sort((a, b) => a[1].localeCompare(b[1]));
  }, [categories]);

  return (
    <Select
      allowClear
      value={value}
      onChange={onChange}
      loading={Result.isLoading(categories)}
      placeholder={trans('irregularities.list.filter.category.placeholder')}
    >
      {options.map(([category, name]) => (
        <Select.Option value={category} key={category}>
          <Capitalized>{name}</Capitalized>
        </Select.Option>
      ))}
    </Select>
  );
};
