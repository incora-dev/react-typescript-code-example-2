import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadIrregularitiesAction } from 'modules/irregularity/irregularity.actions';
import { selectIrregularities } from 'modules/irregularity/irregularity.selectors';
import { Irregularity } from 'modules/irregularity/irregularity.types';
import { Result } from 'utils/result';

export function useIrregularities(): [Result<Irregularity[]>, { refetch: () => void }] {
  const dispatch = useDispatch();
  const irregularities = useSelector(selectIrregularities);

  const loadIrregularities = React.useCallback(() => {
    dispatch(loadIrregularitiesAction.request());
  }, [dispatch]);

  React.useEffect(() => {
    loadIrregularities();
  }, [loadIrregularities]);

  return [irregularities, { refetch: loadIrregularities }];
}
