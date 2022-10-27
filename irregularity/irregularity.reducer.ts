import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import {
  loadIrregularitySubcategoriesAction,
  loadIrregularityAssessorsAction,
  loadIrregularitiesAction,
  loadIrregularityAction,
  updatePaginationAction,
  IrregularitiesAction,
  storeIrregularities,
  updateFiltersAction,
} from './irregularity.actions';
import { IrregularityState } from './irregularity.types';
import { Result } from 'utils/result';

const INITIAL_STATE: IrregularityState = {
  byId: {},
  subcategories: Result.init(),
  assessors: Result.init(),
  irregularityStatus: {},
  irregularityList: {
    result: Result.init(),
    filters: {
      sort: 'irregularityDate,desc',
    },
    pagination: {
      page: 1,
      totalElements: 0,
    },
  },
};

const byIdReducer = createReducer<IrregularityState['byId'], IrregularitiesAction>(
  INITIAL_STATE.byId,
).handleAction(storeIrregularities, (state, { payload }) => ({ ...state, ...payload }));

const irregularityReducer = createReducer<IrregularityState['irregularityStatus'], IrregularitiesAction>(
  INITIAL_STATE.irregularityStatus,
)
  .handleAction(loadIrregularityAction.request, (state, { payload }) => ({
    ...state,
    [payload.irregularityId]: Result.loading(),
  }))
  .handleAction(loadIrregularityAction.success, (state, { payload }) => ({
    ...state,
    [payload.irregularityId]: Result.fulfilled(payload.irregularityId),
  }))
  .handleAction(loadIrregularityAction.failure, (state, { payload }) => ({
    ...state,
    [payload.irregularityId]: Result.failure(),
  }));

const irregularitiesListReducer = createReducer<IrregularityState['irregularityList'], IrregularitiesAction>(
  INITIAL_STATE.irregularityList,
)
  .handleAction(loadIrregularitiesAction.request, state => ({
    ...state,
    result: Result.loading(),
  }))
  .handleAction(loadIrregularitiesAction.success, (state, { payload }) => ({
    ...state,
    result: Result.fulfilled(payload),
  }))
  .handleAction(loadIrregularitiesAction.failure, state => ({
    ...state,
    result: Result.failure(),
  }))
  .handleAction(updateFiltersAction, (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...payload,
    },
  }))
  .handleAction(updatePaginationAction, (state, { payload }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      ...payload,
    },
  }));

const irregularityAssessorsReducer = createReducer<IrregularityState['assessors'], IrregularitiesAction>(
  INITIAL_STATE.assessors,
)
  .handleAction(loadIrregularityAssessorsAction.request, () => Result.loading())
  .handleAction(loadIrregularityAssessorsAction.success, (_, { payload }) => Result.fulfilled(payload))
  .handleAction(loadIrregularityAssessorsAction.failure, () => Result.failure());

const irregularitySubcategoryReducer = createReducer<IrregularityState['subcategories'], IrregularitiesAction>(
  INITIAL_STATE.subcategories,
)
  .handleAction(loadIrregularitySubcategoriesAction.request, () => Result.loading())
  .handleAction(loadIrregularitySubcategoriesAction.success, (_, { payload }) => Result.fulfilled(payload))
  .handleAction(loadIrregularitySubcategoriesAction.failure, () => Result.failure());

export const irregularitiesReducer = combineReducers<IrregularityState>({
  byId: byIdReducer,
  irregularityStatus: irregularityReducer,
  assessors: irregularityAssessorsReducer,
  irregularityList: irregularitiesListReducer,
  subcategories: irregularitySubcategoryReducer,
});
