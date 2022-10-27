import { Select } from 'formik-antd';
import { noop } from 'lodash';
import * as React from 'react';

import { Category, useDirectoryText } from 'modules/app/directory/useDirectoryText';
import { Result } from 'utils/result';

interface IrregularityCategorySelectProps {
  testId?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

export const IrregularityCategorySelect = ({
  disabled,
  onBlur = noop,
  testId = 'irregularity-category',
}: IrregularityCategorySelectProps) => {
  const categories = useDirectoryText(Category.irregularity);

  const options = React.useMemo(() => {
    if (!Result.isFulfilled(categories)) {
      return [];
    }

    return Object.entries(categories.data).sort((a, b) => a[1].localeCompare(b[1]));
  }, [categories]);

  return (
    <Select
      name="category"
      onBlur={onBlur}
      disabled={disabled}
      data-testid={testId}
      loading={Result.isLoading(categories)}
    >
      {options.map(([category, name]) => (
        <Select.Option value={category} key={category}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};
