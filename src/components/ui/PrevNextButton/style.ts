import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const iconStyle = css`
  width: 35px;
  height: 35px;
  color: #fff;
  cursor: pointer;
`;

export const Container = styled.div<{ left?: boolean; location: number }>`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left && `${props.location}px`};
  right: ${(props) => !props.left && `${props.location}px`};
  border-radius: 50%;
  z-index: 7500;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
