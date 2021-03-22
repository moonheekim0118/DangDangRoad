import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Component = styled.section`
  width: 100%;
  height: 80%;
  display: flex;
  flex-grow: 1;
  > * {
    min-width: 100%;
    height: 100%;
    padding: 0.5rem;
  }
`;

export const PostImageContainer = styled.div`
  width: 100%;
  height: 150px;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Header = styled.header`
  width: 100%;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${colorCode['light-gray']};
`;

export const Label = styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  padding: 1.2rem;
`;

export const PlaceName = styled.span`
  width: 70%;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.5rem;
  color: ${colorCode['blue']};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ControllerContainer = styled.div`
  height: 20%;
`;

export const ButtonContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;
