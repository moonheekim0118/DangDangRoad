import { colorCode } from 'common/style/color';
import { css } from '@emotion/react';

export const style = css`
  background-color: inherit;
  color: inherit;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;

export const anchorStyle = css`
  color: inherit;
  text-decoration: none;
  width: 100%;
`;

export const themes = {
  primary: css`
    background-color: ${colorCode['blue']};
    color: #fff;

    &:hover {
      background-color: ${colorCode['light-blue']};
    }
  `,
  danger: css`
    background-color: ${colorCode['red']};
    color: #fff;

    &:hover {
      background-color: ${colorCode['light-red']};
    }
  `,

  info: css`
    background-color: ${colorCode['light-gray']};
    color: ${colorCode['dark-gray']};

    &:hover {
      background-color: ${colorCode['deep-gray']};
    }
  `,
  outlinedPrimary: css`
    border: 1px solid ${colorCode['blue']};
    color: ${colorCode['blue']};

    &:hover {
      background-color: rgba(128, 191, 255, 0.2);
    }
  `,
  outlinedDanger: css`
    border: 1px solid ${colorCode['red']};
    color: ${colorCode['red']};

    &:hover {
      background-color: rgba(255, 0, 0, 0.1);
    }
  `,
  outlinedInfo: css`
    border: 1px solid ${colorCode['dark-gray']};
    color: ${colorCode['dark-gray']};
    &:hover {
      background-color: rgba(225, 225, 208, 0.1);
    }
  `,
  default: css``,
};

export const sizes = {
  large: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `,
  medium: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  small: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
};
