import { IrregularityCategory } from '../irregularity.types';

export interface IrregularityAssessorFormValues {
  id: string;
  grade?: number;
  actions: string;
  comments: string;
  assessorId: string;
  assessment: string;
  medicalRisk?: number | string;
  subcategoryId: string;
  assessorIdType: string;
  category: IrregularityCategory;
}
