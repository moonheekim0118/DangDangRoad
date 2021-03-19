import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colorCode } from 'common/style/color';

export const mainSizes = {
  medium: css`
    padding: 0.8rem;
  `,
  small: css`
    padding: 0.5rem;
  `,
};

export const infoSizes = {
  medium: css`
    font-size: 1.1rem;
    margin-left: 1rem;
  `,
  small: css`
    font-size: 0.8rem;
    margin-left: 0.7rem;
  `,
};

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const Nickname = styled.span`
  font-weight: bold;
`;

export const TimeStamp = styled.span`
  color: ${colorCode['dark-gray']};
`;
