import { PaginationDTO } from '../types/genericApi.types';
import { Reference } from '../types/reference.types';
import { Result } from 'utils/result';

export enum IrregularityRiskLevel {
  VERY_HIGH = 5,
  HIGH = 4,
  MEDIUM = 3,
  LOW = 2,
  NO_RISK = 1,
}

export enum IrregularityType {
  NEGATIVE = 'NEGATIVE',
  POSITIVE = 'POSITIVE',
}

export enum IrregularityCategory {
  TRIAGEBOT = 'TRIAGEBOT',
  TECHNICAL = 'TECHNICAL',
  SERVICE = 'SERVICE',
  MEDICAL = 'MEDICAL',
}

export enum IrregularityStatus {
  ONGOING = 'ONGOING',
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  NEW = 'NEW',
}

export interface IrregularitySubcategoryDTO {
  id: string;
  name: string;
  description: string | null;
}

export type IrregularitySubcategory = IrregularitySubcategoryDTO;

export interface IrregularityDTO {
  id: string;
  grade: number;
  actions: string;
  assessorId?: string;
  medicalRisk: number;
  practitionerId: string;
  type: IrregularityType;
  assessorIdType?: string;
  comments: string | null;
  reporterActions?: string;
  irregularityDate: string;
  assessment: string | null;
  careUnitId: string | null;
  referenceIds: Reference[];
  status: IrregularityStatus;
  firstPractitionerId: string;
  reporterDescription: string;
  subcategoryId: string | null;
  category: IrregularityCategory;
  firstPractitionerDisplayableName: string;
  subcategory: IrregularitySubcategoryDTO | null;
}

export interface Irregularity extends Omit<IrregularityDTO, 'subcategory'> {
  subcategory: IrregularitySubcategory;
}

export interface IrregularityFiltersType {
  irregularityDate?: string;
  subcategory?: string;
  assessorId?: string;
  category?: string;
  status?: string;
  sort?: string;
  type?: string;
}

export interface IrregularityState {
  assessors: Result<string[]>;
  byId: Record<string, Irregularity>;
  subcategories: Result<IrregularitySubcategory[]>;
  irregularityStatus: Record<string, Result<string>>;
  irregularityList: {
    result: Result<string[]>;
    filters: IrregularityFiltersType;
    pagination: Partial<PaginationDTO>;
  };
}
