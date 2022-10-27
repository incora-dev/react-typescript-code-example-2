import { Select } from 'antd';
import * as React from 'react';

import { Category, useDirectoryText } from 'modules/app/directory/useDirectoryText';
import { STATUS_TRANSLATIONS } from 'modules/irregularity/irregularity.constants';
import { IrregularityStatus } from 'modules/irregularity/irregularity.types';
import { trans } from 'translation';
import { Result } from 'utils/result';

interface StatusFilterProps {
  onChange: (value: string) => void;
  value?: IrregularityStatus;
}

export const StatusFilter = ({ onChange, value }: StatusFilterProps) => {
  const categories = useDirectoryText(Category.irregularity);

  return (
    <Select
      allowClear
      value={value}
      onChange={onChange}
      loading={Result.isLoading(categories)}
      placeholder={trans('irregularities.list.filter.status.placeholder')}
    >
      {Object.keys(STATUS_TRANSLATIONS).map(type => (
        <Select.Option key={type} value={type}>
          {STATUS_TRANSLATIONS[type]}
        </Select.Option>
      ))}
    </Select>
  );
};
