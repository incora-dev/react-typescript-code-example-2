import { Tag } from 'antd';
import * as React from 'react';
import styled, { css } from 'styled-components';

import { STATUS_TRANSLATIONS } from 'modules/irregularity/irregularity.constants';
import { IrregularityStatus } from 'modules/irregularity/irregularity.types';

interface IrregularityStatusTagProps {
  status: IrregularityStatus;
}

const StyledTag = styled(Tag)<IrregularityStatusTagProps>`
  text-align: center;
  letter-spacing: 0.05em;

  background: ${({ theme, status }) => {
    switch (status) {
      case IrregularityStatus.ONGOING:
      case IrregularityStatus.OPEN:
        return theme.colors.primaryLight;
      case IrregularityStatus.CLOSED:
        return theme.colors.primary;
    }
    return;
  }};

  ${({ theme, status }) => {
    switch (status) {
      case IrregularityStatus.ONGOING:
      case IrregularityStatus.CLOSED:
      case IrregularityStatus.OPEN:
        return css`
          color: ${theme.colors.background};
          border: none;
        `;
    }
    return;
  }};
`;

export const IrregularityStatusTag = ({ status }: IrregularityStatusTagProps) => (
  <StyledTag status={status}>{STATUS_TRANSLATIONS[status]}</StyledTag>
);
