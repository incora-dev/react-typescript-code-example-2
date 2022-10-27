import { IrregularityCategory, IrregularityType } from '../irregularity.types';

export interface IrregularityFormValues {
  type: IrregularityType;
  reporterActions: string;
  irregularityDate: string;
  reporterDescription: string;
  category: IrregularityCategory;
}
