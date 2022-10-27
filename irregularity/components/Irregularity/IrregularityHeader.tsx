import { Col, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { IrregularityStatusTag } from '../IrregularityStatusTag';
import { IrregularityReference } from './IrregularityReference';
import { Irregularity } from 'modules/irregularity/irregularity.types';
import { Practitioner } from 'modules/practitioner/components/PractitionerId';
import { trans } from 'translation';

interface IrregularityHeaderProps {
  irregularity: Irregularity;
}

const IrregularityHeaderHolder = styled(Col)`
  margin: 36px 0 10px 0;
`;

export const IrregularityHeader = ({ irregularity }: IrregularityHeaderProps) => (
  <IrregularityHeaderHolder>
    <Typography.Title level={4}>
      {trans('irregularity.header', { id: irregularity.id, category: irregularity.category })} &nbsp;
      <IrregularityStatusTag status={irregularity.status} />
    </Typography.Title>
    <Typography.Text>{trans('irregularity.reporter')}</Typography.Text>
    <Practitioner practitionerId={irregularity.practitionerId}>
      <Practitioner.Name />
    </Practitioner>
    <br />
    <IrregularityReference reference={irregularity.referenceIds?.[0]} />
  </IrregularityHeaderHolder>
);
