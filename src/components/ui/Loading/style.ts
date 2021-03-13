import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';
import { keyframes } from '@emotion/react';

export const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled.div<{
  color: string;
  size: number;
  borderSize: number;
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
        width: ${(props) => props.size}px;
        height:${(props) => props.size}px;
        border-radius: 50%;
        border: ${(props) => props.borderSize}px solid ${(props) =>
  colorCode[props.color]};
        border-color: ${(props) => colorCode[props.color]} transparent ${(
  props
) => colorCode[props.color]};
        animation: ${Spin} 1.2s linear infinite;
      }
    }
`;
