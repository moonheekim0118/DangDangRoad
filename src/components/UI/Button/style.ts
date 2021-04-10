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
    background-color: var(--colors-blue);
    color: #fff;

    &:hover {
      background-color: var(--colors-light-blue);
    }
  `,
  danger: css`
    background-color: var(--colors-red);
    color: #fff;

    &:hover {
      background-color: var(--colors-light-red);
    }
  `,

  info: css`
    background-color: var(--colors-light-gray);
    color: var(--colors-dark-gray);

    &:hover {
      background-color: var(--colors-deep-gray);
    }
  `,
  outlinedPrimary: css`
    border: 1px solid var(--colors-blue);
    color: var(--colors-blue);

    &:hover {
      background-color: rgba(128, 191, 255, 0.2);
    }
  `,
  outlinedDanger: css`
    border: 1px solid var(--colors-red);
    color: var(--colors-red);

    &:hover {
      background-color: rgba(255, 0, 0, 0.1);
    }
  `,
  outlinedInfo: css`
    border: 1px solid var(--colors-dark-gray);
    color: var(--colors-dark-gray);
    &:hover {
      background-color: rgba(225, 225, 208, 0.1);
    }
  `,
  special: css`
    background-color: #fff;
    color: var(--colors-blue);

    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(244, 244, 244, 0.75);
    }
  `,
  default: css``,
};

export const sizes = {
  large: css`
    min-height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `,
  medium: css`
    min-height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  small: css`
    min-height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
};
