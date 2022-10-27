import { Select } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectIrregularityAssessors } from 'modules/irregularity/irregularity.selectors';
import { BaseOption } from 'modules/practitioner/components/PractitionerSelect/PractitionerOption';
import { PractitionerType } from 'modules/practitioner/practitioner.types';
import { trans } from 'translation';
import { Result } from 'utils/result';

interface AssessorFilterProps {
  onChange: (value: string) => void;
  value?: string;
}

export const AssessorFilter = ({ onChange, value }: AssessorFilterProps) => {
  const practitioners = useSelector(selectIrregularityAssessors);

  const data = React.useMemo(() => {
    if (!Result.isFulfilled(practitioners)) {
      return [];
    }

    return practitioners.data;
  }, [practitioners]);

  return (
    <Select
      showSearch
      allowClear
      value={value}
      onChange={onChange}
      data-testid="assessor-select"
      optionFilterProp="data-search"
      placeholder={trans('irregularities.list.filter.assessor.placeholder')}
    >
      {data.map((practitioner: PractitionerType) => (
        <Select.Option
          key={practitioner.externalId}
          value={practitioner.externalId}
          data-search={BaseOption.search(practitioner)}
        >
          <BaseOption practitioner={practitioner} />
        </Select.Option>
      ))}
    </Select>
  );
};
