import { css } from '@emotion/react';
import { colorCode } from 'common/style/color';

export const defaultStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
`;

export const themes = {
  primary: css`
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: color 0.5s ease;
    &:hover {
      color: ${colorCode['light-gray']};
    }
  `,
  secondary: css`
    font-weight: bold;
    color: ${colorCode['blue']};
    cursor: pointer;
    transition: color 0.5s ease;
    &:hover {
      color: ${colorCode['light-blue']};
    }
  `,
  default: css``,
};

export const aligns = {
  left: css`
    justify-content: flex-start;
  `,
  right: css`
    justify-content: flex-end;
  `,
  center: css`
    justify-content: center;
  `,
};

export const sizes = {
  large: css`
    font-size: 1.15rem;
  `,
  medium: css`
    font-size: 1rem;
  `,
  small: css`
    font-size: 0.8rem;
  `,
};
