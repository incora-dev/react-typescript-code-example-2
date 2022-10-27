import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useQueryStringState } from 'modules/app/router/hooks/useURLValue';
import { updateFiltersAction } from 'modules/irregularity/irregularity.actions';
import {
  IrregularityType,
  IrregularityStatus,
  IrregularityCategory,
  IrregularityFiltersType,
} from 'modules/irregularity/irregularity.types';

export const useIrregularityListFilters = () => {
  const dispatch = useDispatch();

  const [type, setType] = useQueryStringState<IrregularityFiltersType['type']>('type', undefined);
  const [status, setStatus] = useQueryStringState<IrregularityFiltersType['status']>('status', undefined);
  const [category, setCategory] = useQueryStringState<IrregularityFiltersType['category']>('category', undefined);
  const [irregularityDate, setDate] = useQueryStringState<IrregularityFiltersType['irregularityDate']>(
    'irregularityDate',
    undefined,
  );
  const [assessorId, setAssessorId] = useQueryStringState<IrregularityFiltersType['assessorId']>(
    'assessorId',
    undefined,
  );
  const [subcategory, setSubcategory] = useQueryStringState<IrregularityFiltersType['subcategory']>(
    'subcategory',
    undefined,
  );

  React.useEffect(() => {
    dispatch(
      updateFiltersAction({
        type,
        status,
        category,
        assessorId,
        subcategory,
        irregularityDate,
      }),
    );
  }, [dispatch, type, status, category, irregularityDate, assessorId, subcategory]);

  return React.useMemo(
    () => ({
      type: {
        value: type as IrregularityType,
        set: setType,
      },
      status: {
        value: status as IrregularityStatus,
        set: setStatus,
      },
      category: {
        value: category as IrregularityCategory,
        set: setCategory,
      },
      date: {
        value: irregularityDate,
        set: setDate,
      },
      assessor: {
        value: assessorId,
        set: setAssessorId,
      },
      subcategory: {
        value: subcategory,
        set: setSubcategory,
      },
    }),
    [
      type,
      setType,
      status,
      setStatus,
      category,
      setCategory,
      irregularityDate,
      setDate,
      assessorId,
      setAssessorId,
      subcategory,
      setSubcategory,
    ],
  );
};
