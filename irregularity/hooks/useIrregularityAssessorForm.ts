import { FormikProps, useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { IrregularityCategory } from '../irregularity.types';
import { IrregularityAssessorFormValues } from './irregularityAssessorFormValues.types';
import { useCurrentUser } from 'modules/core/user';
import { assessIrregularitySaga, lockIrregularitySaga } from 'modules/irregularity/irregularity.sagas';
import { trans } from 'translation';
import { Result, useOnTaskFulfilled, useOnTaskFailure } from 'utils/result';
import { useSaga } from 'utils/useSaga';

export function useIrregularityAssessorForm(
  values: Partial<IrregularityAssessorFormValues> = {},
): [
  FormikProps<IrregularityAssessorFormValues>,
  {
    onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onAutoSave: (e: any) => void;
    lockingResult: Result<any>;
    savingResult: Result<any>;
  },
] {
  const currentPractitioner = useCurrentUser();
  const [lockingResult, onLock, lockReset] = useSaga(lockIrregularitySaga);
  const [savingResult, onSave, saveReset] = useSaga(assessIrregularitySaga);

  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        grade: Yup.number().required(trans('validation.required.generic')),
        actions: Yup.string().required(trans('validation.required.generic')),
        category: Yup.string().required(trans('validation.required.generic')),
        comments: Yup.string().required(trans('validation.required.generic')),
        assessorId: Yup.string().required(trans('validation.required.generic')),
        assessment: Yup.string().required(trans('validation.required.generic')),
        medicalRisk: Yup.number().required(trans('validation.required.generic')),
        subcategoryId: Yup.string().required(trans('validation.required.generic')),
      }),
    [],
  );

  const initialValues = React.useMemo(
    () => ({
      id: values.id as string,
      grade: values.grade,
      assessorIdType: 'HSA_ID',
      category: values.category as IrregularityCategory,
      actions: values.actions || '',
      comments: values.comments || '',
      assessorId: values.assessorId || currentPractitioner.externalId,
      assessment: values.assessment || '',
      subcategoryId: values.subcategoryId || '',
      medicalRisk: values.medicalRisk ? `${values.medicalRisk}` : undefined,
    }),
    [values, currentPractitioner],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: params => {
      saveReset();
      onLock(params);
    },
    initialValues,
  });

  useOnTaskFailure(savingResult, () => {
    formik.setSubmitting(false);
    formik.setStatus(undefined);
  });

  useOnTaskFulfilled(savingResult, () => {
    formik.setSubmitting(false);
    formik.setStatus(undefined);
  });

  useOnTaskFulfilled(lockingResult, () => {
    formik.setSubmitting(false);
  });

  useOnTaskFailure(lockingResult, () => {
    formik.setSubmitting(false);
  });

  const saveIrregularity = React.useCallback(() => {
    lockReset();
    formik.setErrors({});

    if (!formik.dirty) {
      return;
    }

    formik.setSubmitting(true);
    formik.setStatus({ save: true });

    onSave(formik.values);
  }, [formik, onSave, lockReset]);

  const onAutoSave = React.useCallback(
    (e: any) => {
      lockReset();
      if (!formik.dirty) {
        return;
      }

      formik.setFieldError(e.target.name, undefined);
      formik.setStatus({ autoSave: true });
      onSave(formik.values);
    },
    [formik, lockReset, onSave],
  );

  return [formik, { savingResult, lockingResult, onSave: saveIrregularity, onAutoSave }];
}
