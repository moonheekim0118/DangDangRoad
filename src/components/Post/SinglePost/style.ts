import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0 1rem;
  }
  padding: 1.5rem;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    > * {
      margin: 1rem 0;
    }
  }
`;

export const ContentsContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0.8rem 0;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  position: sticky;
  top: -25px;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 7000;
  display: none;
  text-align: cetner;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.8rem;
  color: ${colorCode['blue']};
  padding: 0.5rem;

  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PlaceName = styled.span`
  text-align: cetner;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.8rem;
  color: ${colorCode['blue']};

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

export const PlaceDetail = styled.span`
  text-align: center;
  font-size: 0.9rem;
  color: ${colorCode['dark-gray']};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-grow: 1;

  @media only screen and (max-width: 1024px) {
    flex-direction: row;
  }
`;

export const Info = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.1rem;
  color: ${colorCode['gray']};
`;

export const FreeCommentContainer = styled.div`
  border: 1px solid ${colorCode['light-gray']};
  padding: 1rem;
`;

export const AdminContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
