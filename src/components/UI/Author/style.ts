import styled from '@emotion/styled';
import { css } from '@emotion/react';

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

export const timeSizes = {
  medium: css`
    font-size: 0.8rem;
    margin-top: 0.3rem;
  `,
  small: css`
    font-size: 0.5rem;
    margin-top: 0.2rem;
  `,
};

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const Nickname = styled.span`
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TimeStamp = styled.span`
  color: var(--colors-dark-gray);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
