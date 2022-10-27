import { Select } from 'antd';
import * as React from 'react';

import { Category, useDirectoryText } from 'modules/app/directory/useDirectoryText';
import { TYPE_TRANSLATIONS } from 'modules/irregularity/irregularity.constants';
import { IrregularityType } from 'modules/irregularity/irregularity.types';
import { trans } from 'translation';
import { Result } from 'utils/result';

interface TypeFilterProps {
  onChange: (value: string) => void;
  value?: IrregularityType;
}

export const TypeFilter = ({ onChange, value }: TypeFilterProps) => {
  const categories = useDirectoryText(Category.irregularity);

  return (
    <Select
      allowClear
      value={value}
      onChange={onChange}
      loading={Result.isLoading(categories)}
      placeholder={trans('irregularities.list.filter.type.placeholder')}
    >
      {Object.keys(TYPE_TRANSLATIONS).map(type => (
        <Select.Option key={type} value={type}>
          {TYPE_TRANSLATIONS[type]}
        </Select.Option>
      ))}
    </Select>
  );
};
