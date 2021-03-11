import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

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

  &:hover {
    top: -15px;
  }
`;
