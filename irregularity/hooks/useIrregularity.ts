import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadIrregularityAction } from 'modules/irregularity/irregularity.actions';
import { selectIrregularity } from 'modules/irregularity/irregularity.selectors';
import { Irregularity } from 'modules/irregularity/irregularity.types';

export function useIrregularity(irregularityId: string): [Irregularity | undefined, { refetch: () => void }] {
  const dispatch = useDispatch();
  const irregularity = useSelector(state => selectIrregularity(state, irregularityId));

  const loadIrregularity = React.useCallback(() => {
    dispatch(loadIrregularityAction.request({ irregularityId }));
  }, [dispatch, irregularityId]);

  React.useEffect(() => {
    loadIrregularity();
  }, [loadIrregularity]);

  return [irregularity, { refetch: loadIrregularity }];
}
