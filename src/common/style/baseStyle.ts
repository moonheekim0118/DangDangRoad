import { css } from '@emotion/react';
import { colorCode } from 'common/style/color';

export const baseModalStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 7000;
`;

export const navLinkStyle = css`
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: ${colorCode['light-gray']};
  }
`;
