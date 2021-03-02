import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Loading = (): React.ReactElement => {
  return <Loader />;
};

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
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
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 6px solid blue;
        border-color: blue transparent blue transparent;
        animation: ${Spin} 1.2s linear infinite;
      }
    }
`;

export default Loading;
