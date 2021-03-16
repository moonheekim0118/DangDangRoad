import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colorCode } from 'common/style/color';

export const mainSizes = {
  medium: css`
    padding: 0.8rem;
    gap: 1rem;
  `,
  small: css`
    padding: 0.5rem;
    gap: 0.7rem;
  `,
};

export const infoSizes = {
  medium: css`
    font-size: 1.1rem;
  `,
  small: css`
    font-size: 0.8rem;
  `,
};

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.span`
  font-weight: bold;
`;

export const TimeStamp = styled.span`
  color: ${colorCode['dark-gray']};
`;
