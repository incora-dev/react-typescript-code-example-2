import * as React from 'react';

import { Reference, ReferenceSystem } from '../../../types/reference.types';
import { LinkToAppointment } from 'modules/notifications/components/LinkToAppointment';
import { trans } from 'translation';

interface IrregularityReferenceProps {
  reference: Reference | null;
}

export const IrregularityReference = ({ reference }: IrregularityReferenceProps) => {
  if (reference?.system === ReferenceSystem.APPOINTMENT) {
    return (
      <LinkToAppointment appointmentId={reference.value}>{trans('irregularity.reference.link')}</LinkToAppointment>
    );
  }

  return null;
};
