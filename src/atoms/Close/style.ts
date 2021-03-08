import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const iconStyle = css`
  width: 25px;
  height: 25px;
`;

export const Container = styled.div`
  width: 65px;
  height: 65px;
  text-align: center;
  border-radius: 50%;
  padding: 20px;
  color: black;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 0, 0, 0.3);
  }
`;
