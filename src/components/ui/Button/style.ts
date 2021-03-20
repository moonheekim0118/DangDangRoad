import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Button = styled.button`
  word-wrap: break-word;
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
  special: css`
    background-color: #fff;
    color: ${colorCode['blue']};

    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(244, 244, 244, 0.75);
    }
  `,
  default: css``,
};

export const sizes = {
  large: css`
    font-size: 1.125rem;
    padding: 0.9rem 1.5rem;
  `,
  medium: css`
    font-size: 1rem;
    padding: 0.5rem 1rem;
  `,
  small: css`
    font-size: 0.75rem;
    padding: 0.3rem 0.875rem;
  `,
};
