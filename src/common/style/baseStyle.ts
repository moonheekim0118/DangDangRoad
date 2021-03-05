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

export const baseButtonStyle = css`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 15px;
  padding: 13px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;

export const saveBtnStyle = css`
  background-color: ${colorCode['blue']};
  color: #fff;

  &:hover {
    background-color: ${colorCode['light-blue']};
  }
`;

export const navLinkStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: ${colorCode['light-gray']};
  }
`;

export const navLinkStyleWithMargin = css`
  margin: 0 20px 0 0;
  ${navLinkStyle}
`;
