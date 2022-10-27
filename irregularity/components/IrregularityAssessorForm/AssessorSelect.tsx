import { Select } from 'formik-antd';
import { noop } from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectIrregularityAssessors } from 'modules/irregularity/irregularity.selectors';
import { BaseOption } from 'modules/practitioner/components/PractitionerSelect/PractitionerOption';
import { PractitionerType } from 'modules/practitioner/practitioner.types';
import { Result } from 'utils/result';

interface AssessorSelectProps {
  disabled?: boolean;
  onBlur?: () => void;
}

export const AssessorSelect = ({ disabled, onBlur = noop }: AssessorSelectProps) => {
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
      onBlur={onBlur}
      name="assessorId"
      disabled={disabled}
      data-testid="assessor-select"
      optionFilterProp="data-search"
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
