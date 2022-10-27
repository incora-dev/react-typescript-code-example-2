import { Select } from 'formik-antd';
import { noop } from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectIrregularitySubcategories } from 'modules/irregularity/irregularity.selectors';
import { Result } from 'utils/result';

interface IrregularitySubcategorySelectProps {
  disabled?: boolean;
  onBlur?: () => void;
}

export const IrregularitySubcategorySelect = ({ disabled, onBlur = noop }: IrregularitySubcategorySelectProps) => {
  const subcategories = useSelector(selectIrregularitySubcategories);

  return (
    <Select
      onBlur={onBlur}
      disabled={disabled}
      name="subcategoryId"
      data-testid="irregularity-subcategory"
      loading={Result.isLoading(subcategories)}
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
