import axios from 'axios';
import moment from 'moment';
import { normalize } from 'normalizr';

import { ReferenceSystem } from '../types/reference.types';
import { IrregularityAssessorFormValues, IrregularityFormValues } from './hooks';
import { irregularitySchema } from './irregularity.schema';
import { Irregularity, IrregularityDTO } from './irregularity.types';
import { DTOUsualPatient, ChildDTOInHealthManager } from 'modules/patient/patient.dto';

export interface NormalizrResult {
  child?: Record<string, ChildDTOInHealthManager>;
  irregularities: Record<string, Irregularity>;
  patient: Record<string, DTOUsualPatient>;
}

export const lockIrregularity = (irregularityId: string) =>
  axios.post(`/rest/healthmanager/irregularities/v2/${encodeURIComponent(irregularityId)}/lock`);

export const assessIrregularity = async (values: IrregularityAssessorFormValues) => {
  const { data } = await axios.put<IrregularityDTO>(
    `/rest/healthmanager/irregularities/v2/${encodeURIComponent(values.id)}`,
    {
      ...values,
      subcategory: values.subcategoryId ? { id: values.subcategoryId } : undefined,
    },
  );

  return normalize<IrregularityDTO, NormalizrResult>(data, irregularitySchema);
};

export const fetchIrregularity = async (irregularityId: string) => {
  const { data } = await axios.get<IrregularityDTO>(
    `/rest/healthmanager/irregularities/v2/${encodeURIComponent(irregularityId)}`,
  );

  return normalize<IrregularityDTO, NormalizrResult>(data, irregularitySchema);
};

export const createIrregularity = async (
  appointmentId: string,
  { type, category, reporterActions, irregularityDate, reporterDescription }: IrregularityFormValues,
) => {
  const { data } = await axios.post('/rest/healthmanager/irregularities/v2', {
    type,
    category,
    reporterActions,
    reporterDescription,
    irregularityDate: moment(irregularityDate).format('YYYY-MM-DD'),
    referenceIds: [
      {
        system: ReferenceSystem.APPOINTMENT,
        value: appointmentId,
      },
    ],
  });

  return data;
};

export const fetchIrregularities = async (query = '') => {
  const { data } = await axios.get(`/rest/healthmanager/irregularities/v2?${query}`);
  const { content, ...pagination } = data;

  return {
    ...normalize<IrregularityDTO[], NormalizrResult>(content, [irregularitySchema]),
    pagination,
  };
};

export const fetchIrregularitySubcategories = async () => {
  const { data } = await axios.get('/rest/healthmanager/irregularities/v1/subcategories');

  return data;
};
