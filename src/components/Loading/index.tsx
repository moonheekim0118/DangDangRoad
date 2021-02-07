import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Loading = () => {
  return (
    <Container>
      <Loader />
    </Container>
  );
};

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
    display: inline-block;
    width: 200px;
    height: 200px;

    &:after{
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid blue;
        border-color: blue transparent blue transparent;
        animation: ${Spin} 1.2s linear infinite;
      }
    }
`;

export default Loading;
