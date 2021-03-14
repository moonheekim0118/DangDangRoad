import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colorCode } from 'common/style/color';

export const iconStyle = css`
  color: #fff;
`;

export const Container = styled.div<{ size: number }>`
  background-color: ${colorCode['dark-gray']};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const StyledAvatar = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  object-fit: cover;
`;
