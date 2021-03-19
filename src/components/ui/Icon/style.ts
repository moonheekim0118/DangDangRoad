import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ButtonComponent = styled.button`
  border: 0;
  background-color: transparent;
  color: inherit;

  &:focus {
    outline: none;
  }
`;

export const Component = styled(FontAwesomeIcon)`
  color: inherit;
  width: 100%;
  height: 100%;
`;

export const sizes = {
  large: css`
    width: 1.6rem !important;
    height: 1.6rem;
  `,
  medium: css`
    width: 1.05rem !important;
    height: 1.05rem;
  `,
  small: css`
    width: 0.8rem !important;
    height: 0.8rem;
  `,
};
