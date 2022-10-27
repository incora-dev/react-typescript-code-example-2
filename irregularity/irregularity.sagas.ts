import { message } from 'antd';
import { stringify } from 'querystring';
import { call, all, put, select, takeLeading, takeEvery, takeLatest } from 'redux-saga/effects';
import { getType, ActionType } from 'typesafe-actions';

import { IrregularityAssessorFormValues } from './hooks/irregularityAssessorFormValues.types';
import { IrregularityFormValues } from './hooks/irregularityFormValues.types';
import {
  loadIrregularityAction,
  updatePaginationAction,
  loadIrregularitiesAction,
  loadIrregularityAssessorsAction,
  loadIrregularitySubcategoriesAction,
} from './irregularity.actions';
import * as API from './irregularity.api';
import { selectIrregularity, selectIrregularityFilters, selectIrregularityPagination } from './irregularity.selectors';
import { IrregularitySubcategory } from './irregularity.types';
import { CONFIG_PARAMS } from 'app-constants/config';
import { ROLES } from 'app-constants/user';
import { setConfigAction } from 'modules/core/config/config.actions';
import { selectConfigFor } from 'modules/core/config/config.selectors';
import { reportRecovery } from 'modules/core/errorReporting';
import { PersistentValues } from 'modules/core/persistent';
import { loadPractitionerListByQuery } from 'modules/practitioner/practitioner.sagas';
import { mapNormalizedDataToStore } from 'modules/types/types.saga';
import { trans } from 'translation';
import { getCleanedObject } from 'utils/object';

export function* lockIrregularitySaga(values: IrregularityAssessorFormValues) {
  const irregularity = yield select(state => selectIrregularity(state, values.id));

  yield call(API.assessIrregularity, {
    referenceIds: irregularity.referenceIds,
    ...values,
  } as any);
  yield call(API.lockIrregularity, values.id);

  const { entities } = yield call(API.fetchIrregularity, values.id);

  yield mapNormalizedDataToStore(entities);
}

export function* assessIrregularitySaga(values: IrregularityAssessorFormValues) {
  const irregularity = yield select(state => selectIrregularity(state, values.id));

  const { entities } = yield call(API.assessIrregularity, {
    referenceIds: irregularity.referenceIds,
    ...values,
  } as any);

  yield mapNormalizedDataToStore(entities);
}

export function* loadIrregularitySaga({ payload }: ReturnType<typeof loadIrregularityAction.request>) {
  try {
    const { entities } = yield call(API.fetchIrregularity, payload.irregularityId);

    yield mapNormalizedDataToStore(entities);
    yield put(loadIrregularityAction.success({ irregularityId: payload.irregularityId }));
  } catch (error) {
    yield put(loadIrregularityAction.failure({ error, irregularityId: payload.irregularityId }));
  }
}

export function* createIrregularitySaga(appointmentId: string, values: IrregularityFormValues) {
  const irregularity = yield call(API.createIrregularity, appointmentId, values);

  try {
    yield call(API.lockIrregularity, irregularity.id);
  } catch (error) {
    message.error(trans('appointment.irregularities.lock.failed'));
  }
}

export function* loadIrregularityAssessorsSaga() {
  try {
    const result = yield call(loadPractitionerListByQuery, {
      includeCareUnit: true,
      careUnitRole: ROLES.IRREGULARITY_ASSESSOR,
    });

    yield put(loadIrregularityAssessorsAction.success(result));
  } catch (error) {
    yield put(loadIrregularityAssessorsAction.failure(error));
  }
}

export function* loadIrregularitySubcategoriesSaga() {
  try {
    const subcategories = yield call(API.fetchIrregularitySubcategories);

    yield put(
      loadIrregularitySubcategoriesAction.success(
        subcategories.sort((a: IrregularitySubcategory, b: IrregularitySubcategory) => a.name.localeCompare(b.name)),
      ),
    );
  } catch (error) {
    yield put(loadIrregularitySubcategoriesAction.failure(error));
  }
}

export function* loadIrregularitiesSaga(action: ActionType<typeof loadIrregularitiesAction.request>) {
  try {
    const filters = yield select(selectIrregularityFilters);
    const pagination = yield select(selectIrregularityPagination);

    // @NB pageSize is persisted and separate from other pagination fields
    const pageSize = yield select(state => selectConfigFor(state, CONFIG_PARAMS.defaultIrregularitiesTablePageSize));

    const query = getCleanedObject({
      page: pagination.page,
      size: pageSize,
      ...filters,
    });

    const { entities, result, pagination: paginationResponse }: any = yield call<typeof API.fetchIrregularities>(
      API.fetchIrregularities,
      stringify(query),
    );

    yield mapNormalizedDataToStore(entities);
    yield put(updatePaginationAction(paginationResponse));
    yield put(loadIrregularitiesAction.success(result));
  } catch (error) {
    yield put(loadIrregularitiesAction.failure(error));

    yield reportRecovery(error, {}, action);
  }
}

function* updatePaginationSaga({ payload }: ActionType<typeof updatePaginationAction>) {
  if (payload?.size) {
    yield put(setConfigAction({ item: PersistentValues.defaultIrregularitiesTablePageSize, value: payload.size }));
  }
}

export function* irregularitySagas() {
  yield all([
    takeLeading(getType(loadIrregularitySubcategoriesAction.request), loadIrregularitySubcategoriesSaga),
    takeLeading(getType(loadIrregularityAssessorsAction.request), loadIrregularityAssessorsSaga),
    takeLeading(getType(loadIrregularitiesAction.request), loadIrregularitiesSaga),
    takeLatest(getType(loadIrregularityAction.request), loadIrregularitySaga),
    takeEvery(updatePaginationAction, updatePaginationSaga),
  ]);
}
