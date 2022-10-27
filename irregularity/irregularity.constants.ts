import {
  IrregularityCategory,
  IrregularityRiskLevel,
  IrregularityStatus,
  IrregularityType,
} from './irregularity.types';
import { trans } from 'translation';

export const TYPE_TRANSLATIONS: Record<IrregularityType, string> = {
  [IrregularityType.NEGATIVE]: trans('irregularities.type.negative'),
  [IrregularityType.POSITIVE]: trans('irregularities.type.positive'),
};

export const CATEGORY_TRANSLATIONS: Record<IrregularityCategory, string> = {
  [IrregularityCategory.MEDICAL]: trans('irregularities.category.medical'),
  [IrregularityCategory.SERVICE]: trans('irregularities.category.service'),
  [IrregularityCategory.TECHNICAL]: trans('irregularities.category.technical'),
  [IrregularityCategory.TRIAGEBOT]: trans('irregularities.category.triagebot'),
};

export const STATUS_TRANSLATIONS: Record<IrregularityStatus, string> = {
  [IrregularityStatus.ONGOING]: trans('irregularities.status.ongoing'),
  [IrregularityStatus.CLOSED]: trans('irregularities.status.closed'),
  [IrregularityStatus.OPEN]: trans('irregularities.status.open'),
  [IrregularityStatus.NEW]: trans('irregularities.status.new'),
};

export const RISK_TRANSLATIONS: Record<IrregularityRiskLevel, string> = {
  [IrregularityRiskLevel.LOW]: trans('irregularities.risk.level.low'),
  [IrregularityRiskLevel.HIGH]: trans('irregularities.risk.level.high'),
  [IrregularityRiskLevel.MEDIUM]: trans('irregularities.risk.level.medium'),
  [IrregularityRiskLevel.NO_RISK]: trans('irregularities.risk.level.no.risk'),
  [IrregularityRiskLevel.VERY_HIGH]: trans('irregularities.risk.level.very.high'),
};
