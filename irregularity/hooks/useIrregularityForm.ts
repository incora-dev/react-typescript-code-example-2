import { FormikProps, useFormik } from 'formik';
import moment from 'moment';
import * as React from 'react';
import * as Yup from 'yup';

import { IrregularityFormValues } from './irregularityFormValues.types';
import { createIrregularitySaga } from 'modules/irregularity/irregularity.sagas';
import { IrregularityCategory, IrregularityType } from 'modules/irregularity/irregularity.types';
import { trans } from 'translation';
import { Result, useOnTaskFailure } from 'utils/result';
import { useSaga } from 'utils/useSaga';

export function useIrregularityForm(
  values: Partial<IrregularityFormValues> = {},
  appointmentId: string,
): [FormikProps<IrregularityFormValues>, { result: Result<unknown>; reset: Function }] {
  const [result, onSubmit, reset] = useSaga(createIrregularitySaga);

  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape<Partial<IrregularityFormValues>>({
        type: Yup.mixed()
          .oneOf([IrregularityType.POSITIVE, IrregularityType.NEGATIVE])
          .required(trans('validation.empty.givenName')),
        category: Yup.mixed()
          .oneOf([IrregularityCategory.TECHNICAL, IrregularityCategory.MEDICAL, IrregularityCategory.TRIAGEBOT])
          .required(trans('validation.empty.givenName')),
        reporterActions: Yup.string(),
        irregularityDate: Yup.string().required(trans('validation.empty.givenName')),
        reporterDescription: Yup.string().required(trans('validation.empty.givenName')),
      }),
    [],
  );

  const initialValues = React.useMemo(
    () => ({
      reporterActions: values.reporterActions || '',
      type: values.type || IrregularityType.NEGATIVE,
      reporterDescription: values.reporterDescription || '',
      category: values.category || IrregularityCategory.MEDICAL,
      irregularityDate: values.irregularityDate || moment().format('YYYY-MM-DD'),
    }),
    [values],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: values => {
      onSubmit(appointmentId, values);
    },
  });

  useOnTaskFailure(result, () => {
    formik.setSubmitting(false);
  });

  return [formik, { result, reset }];
}
