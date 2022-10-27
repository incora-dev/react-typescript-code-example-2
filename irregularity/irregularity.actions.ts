import { ActionType, createAsyncAction, createStandardAction } from 'typesafe-actions';

import {
  Irregularity,
  IrregularityState,
  IrregularityFiltersType,
  IrregularitySubcategory,
} from './irregularity.types';

export const storeIrregularities = createStandardAction('@irregularity/storeIrregularities')<
  Record<string, Irregularity>
>();

export const loadIrregularityAssessorsAction = createAsyncAction(
  '@irregularity/loadIrregularityAssessors/request',
  '@irregularity/loadIrregularityAssessors/success',
  '@irregularity/loadIrregularityAssessors/failure',
)<void, string[], Error>();

export const loadIrregularitySubcategoriesAction = createAsyncAction(
  '@irregularity/loadIrregularitySubcategories/request',
  '@irregularity/loadIrregularitySubcategories/success',
  '@irregularity/loadIrregularitySubcategories/failure',
)<void, IrregularitySubcategory[], Error>();

export const loadIrregularityCategoriesAction = createAsyncAction(
  '@irregularity/loadIrregularityCategories/request',
  '@irregularity/loadIrregularityCategories/success',
  '@irregularity/loadIrregularityCategories/failure',
)<void, string[], Error>();

export const loadIrregularityAction = createAsyncAction(
  '@irregularity/loadIrregularityRequest',
  '@irregularity/loadIrregularitySuccess',
  '@irregularity/loadIrregularityFailure',
)<{ irregularityId: string }, { irregularityId: string }, { irregularityId: string; error: Error }>();

export const loadIrregularitiesAction = createAsyncAction(
  '@irregularity/loadIrregularitiesRequest',
  '@irregularity/loadIrregularitiesSuccess',
  '@irregularity/loadIrregularitiesFailure',
)<void, string[], Error>();

export const updatePaginationAction = createStandardAction('@irregularity/updatePagination')<
  IrregularityState['irregularityList']['pagination']
>();

export const updateFiltersAction = createStandardAction('@irregularity/updateFilters')<
  Partial<IrregularityFiltersType>
>();

export type IrregularitiesAction = ActionType<
  | typeof loadIrregularitySubcategoriesAction
  | typeof loadIrregularityCategoriesAction
  | typeof loadIrregularityAssessorsAction
  | typeof loadIrregularitiesAction
  | typeof loadIrregularityAction
  | typeof updatePaginationAction
  | typeof storeIrregularities
  | typeof updateFiltersAction
>;
