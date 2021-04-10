import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const titleDelay = 1.8;
const initialOpacityDelay = 2;
const initialTransformDelay = 2.5;

const fadeIn = keyframes`
  0%{ opacity:0; }
  50%,100% { opacity:1;}
`;

const fadeOut = keyframes`
  0%{ opacity:1; }
  50%,100% { opacity:0; }
`;

const toRight = keyframes`ss
  0%{
    transform: translateX(-300px);}
  50%,100% {
    transform: translateX(300px); }
`;

const toLeft = keyframes`
  0%{ transform: translateX(300px);}
  50%,100% { transform: translateX(-300px) }
`;

export const calculateAnimation = (
  index: number,
  status: 'hide' | 'show' | '',
  direction?: 'right' | 'left'
) => {
  if (status === '') return;
  if (index === 0) {
    // title
    return status === 'show'
      ? css`
          animation: ${fadeIn} ${titleDelay}s ease forwards;
        `
      : css`
          animation: ${fadeOut} ${titleDelay}s ease forwards;
        `;
  }
  // calculate Delay by its index
  const opacityDelay = index - 1 + initialOpacityDelay;
  const transformDelay = index - 1 + initialTransformDelay;
  if (status === 'show') {
    if (direction === 'right')
      return css`
        animation: ${fadeIn} ${opacityDelay}s ease forwards,
          ${toRight} ${transformDelay}s ease forwards;
      `;
    return css`
      animation: ${fadeIn} ${opacityDelay}s ease forwards,
        ${toLeft} ${transformDelay}s ease forwards;
    `;
  }
  if (direction === 'right')
    return css`
      animation: ${fadeOut} ${opacityDelay}s ease forwards,
        ${toRight} ${transformDelay}s ease forwards;
    `;
  return css`
    animation: ${fadeOut} ${opacityDelay}s ease forwards,
      ${toLeft} ${transformDelay}s ease forwards;
  `;
};

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;

  > * {
    margin: 0.8rem 0;
  }

  @media only screen and (max-width: 780px) {
    flex-direction: column;
    margin-top: 70px;
  }
`;

export const Title = styled.h1`
  position: absolute;
  top: -80px;
  width: 100%;
  text-align: center;
  color: #fff;
  opacity: 0;
`;

export const ImageContainer = styled.div`
  left: -300px;
  opacity: 0;
  display: grid;
  place-items: center;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: 0 1.5rem;
  > * {
    margin: 1rem 0;
  }

  @media only screen and (max-width: 780px) {
    width: 100%;
    margin: 0;
  }
`;

export const ContentsTitle = styled.p`
  font-size: 1.4rem;
  font-family: var(--font-special);
  color: var(--colors-blue);
`;

export const TextContainer = styled.div`
  top: 0;
  right: -300px;
  opacity: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 25px;
  display: inline;
  padding: 20px;
  color: black;
  cursor: pointer;
  box-shadow: 0px 0px 7px 0px rgba(244, 244, 244, 0.75);
  transition: top 0.5s ease;

  &:hover {
    top: -15px;
  }

  @media only screen and (max-width: 780px) {
    width: 80%;
  }
`;
