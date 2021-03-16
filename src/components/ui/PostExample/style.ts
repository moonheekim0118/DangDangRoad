import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { colorCode } from 'common/style/color';

const fadeIn = keyframes`
  0%{ opacity:0; }
  50%,100% { opacity:1;}
`;

const fadeOut = keyframes`
  0%{ opacity:1; }
  50%,100% { opacity:0; }
`;

const toRight = keyframes`
  0%{
    transform: translateX(-300px);}
  50%,100% {
    transform: translateX(300px); }
`;

const toLeft = keyframes`
  0%{ transform: translateX(300px);}
  50%,100% { transform: translateX(-300px) }
`;

export const getAnimations = (element: string, show: 'show' | 'hide' | '') => {
  switch (show) {
    case 'show':
      switch (element) {
        case 'title':
          return animationThemes.titleIn;
        case 'image':
          return animationThemes.imageIn;
        case 'first':
          return animationThemes.firstBoxIn;
        case 'second':
          return animationThemes.secondBoxIn;
        case 'third':
          return animationThemes.thirdBoxIn;
        default:
          return '';
      }
    case 'hide':
      switch (element) {
        case 'title':
          return animationThemes.titleOut;
        case 'image':
          return animationThemes.imageOut;
        case 'first':
          return animationThemes.firstBoxOut;
        case 'second':
          return animationThemes.secondBoxOut;
        case 'third':
          return animationThemes.thirdBoxOut;
        default:
          return '';
      }
    default:
      return '';
  }
};

export const animationThemes = {
  titleIn: css`
    animation: ${fadeIn} 1.8s ease forwards;
  `,
  titleOut: css`
    animation: ${fadeOut} 1.8s ease forwards;
  `,
  imageIn: css`
    animation: ${fadeIn} 1.8s ease forwards, ${toRight} 2s ease forwards;
  `,
  imageOut: css`
    animation: ${fadeOut} 2s ease forwards, ${toLeft} 2s ease forwards;
  `,
  firstBoxIn: css`
    animation: ${fadeIn} 2.5s ease forwards, ${toLeft} 2.5s ease forwards;
  `,
  firstBoxOut: css`
    animation: ${fadeOut} 2.5s ease forwards, ${toRight} 2.5s ease forwards;
  `,

  secondBoxIn: css`
    animation: ${fadeIn} 2.5s ease forwards, ${toLeft} 3s ease forwards;
  `,
  secondBoxOut: css`
    animation: ${fadeOut} 2.5s ease forwards, ${toRight} 3s ease forwards;
  `,

  thirdBoxIn: css`
    animation: ${fadeIn} 3s ease forwards, ${toLeft} 3.5s ease forwards;
  `,
  thirdBoxOut: css`
    animation: ${fadeIn} 3s ease forwards, ${toRight} 3.5s ease forwards;
  `,
};

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 25px;

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

export const ContentsCotnainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 30%;

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

export const ContentsTitle = styled.p`
  font-size: 1.4rem;
  font-family: 'Do Hyeon', sans-serif;
  color: ${colorCode['blue']};
`;

export const TextContainer = styled.div`
  top: 0;
  right: -300px;
  opacity: 0;
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
`;
