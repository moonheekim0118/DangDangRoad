import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const iconStyle = css`
  cursor: pointer;
  border-radius: 50%;
  color: black;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(95deg);
  }
`;
