import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';
import { css } from '@emotion/react';

export const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Title = styled.span`
  padding: 0 0.5rem;
`;

export const buttonStyle = css`
  background-color: #fff;
  border: none;
`;

export const iconStyle = css`
  color: ${colorCode['light-blue']};
  transition: color 0.5s ease;
  &:hover {
    color: ${colorCode['light-blue']};
  }
`;
