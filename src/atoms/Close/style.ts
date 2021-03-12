import { css } from '@emotion/react';

export const iconStyle = css`
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 0, 0, 0.3);
  }
`;
