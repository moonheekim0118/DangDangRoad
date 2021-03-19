import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const contentsLoaderStyle = css`
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  @media only screen and (max-width: 1024px) {
    display: block;
  }
`;
