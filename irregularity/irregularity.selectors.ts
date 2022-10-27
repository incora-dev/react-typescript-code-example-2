import { createSelector } from 'reselect';

import { Irregularity } from './irregularity.types';
import { selectAllPractitioners } from 'modules/practitioner';
import { fullName } from 'modules/practitioner/practitioner.utils';
import { RootStore } from 'root-types';
import { Result } from 'utils/result';

export const withNamespace = (state: RootStore) => state.irregularities;

const selectRecords = (state: RootStore) => withNamespace(state).byId;

const selectAssessors = (state: RootStore) => withNamespace(state).assessors;

export const selectIrregularitySubcategories = (state: RootStore) => withNamespace(state).subcategories;

export const selectIrregularity = (state: RootStore, irregularityId?: string | null) => {
  if (!irregularityId) {
    return undefined;
  }

  return withNamespace(state).byId[irregularityId];
};

const selectIrregularityList = (state: RootStore) => withNamespace(state).irregularityList.result;

export const selectIrregularityAssessors = createSelector(
  selectAllPractitioners,
  selectAssessors,
  (practitioners, ids) =>
    Result.map(ids, data =>
      data
        .map(id => practitioners[id])
        .filter(Boolean)
        .sort((a, b) => fullName(a).localeCompare(fullName(b))),
    ),
);

export const selectIrregularityFilters = (state: RootStore) => withNamespace(state).irregularityList.filters;

export const selectIrregularityPagination = (state: RootStore) => withNamespace(state).irregularityList.pagination;

export const selectIrregularities: (state: RootStore) => Result<Irregularity[]> = createSelector(
  selectRecords,
  selectIrregularityList,
  (irregularities, filteredResult) =>
    Result.map(filteredResult, data => data.map(id => irregularities[id]).filter(Boolean)),
);
