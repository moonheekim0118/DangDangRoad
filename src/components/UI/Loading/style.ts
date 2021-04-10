import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { keyframes } from '@emotion/react';

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const sizes = {
  large: css`
    width: 4rem;
    height: 4rem;
    border: 6px solid;
  `,
  medium: css`
    width: 1.875rem;
    height: 1.875rem;
    border: 4px solid;
  `,
  small: css`
    width: 0.9375rem;
    height: 0.9375rem;
    border: 2px solid;
  `,
};

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const Loader = styled.div<{
  color: string;
  size: 'large' | 'medium' | 'small';
}>`
    display: inline-block;
    position:relative;
    width: 100%;
    height: 100%;
    background-color:inherit;

    z-index:2000;

    &:after{
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        ${(props) => sizes[props.size]}
        border-color: ${(props) => props.color} 
        transparent ${(props) => props.color};
        animation: ${Spin} 1.2s linear infinite;
      }
    }
`;
