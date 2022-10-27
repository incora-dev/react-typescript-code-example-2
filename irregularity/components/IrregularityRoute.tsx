import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { Irregularity } from './Irregularity';
import { IrregularityList } from './IrregularityList';
import { STATIC_ROUTES } from 'modules/app/router';
import {
  loadIrregularityAssessorsAction,
  loadIrregularityCategoriesAction,
  loadIrregularitySubcategoriesAction,
} from 'modules/irregularity/irregularity.actions';

export const IrregularityRoute = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadIrregularityAssessorsAction.request());
    dispatch(loadIrregularityCategoriesAction.request());
    dispatch(loadIrregularitySubcategoriesAction.request());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={`${STATIC_ROUTES.irregularities}/:irregularityId`}>
        <Irregularity />
      </Route>
      <Route path={STATIC_ROUTES.irregularities}>
        <IrregularityList />
      </Route>
    </Switch>
  );
};
