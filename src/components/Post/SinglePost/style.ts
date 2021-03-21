import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Container = styled.article`
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
    margin: 0.7rem 0;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    height: 450px;

    > * {
      margin: 0.5rem 0;
    }
  }
`;

export const PlaceName = styled.h1`
  width: 100%;
  text-align: center;
  font-family: 'Do Hyeon', sans-serif;
  color: ${colorCode['blue']};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PlaceDetail = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  color: ${colorCode['dark-gray']};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  font-size: 1rem;
`;

export const AdminContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
