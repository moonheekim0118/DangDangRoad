import styled from '@emotion/styled';

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
    overflow-y: auto;
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
  }
`;

export const PlaceName = styled.h1`
  width: 100%;
  text-align: center;
  font-family: var(--font-special);
  color: var(--colors-blue);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PlaceDetail = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  color: var(--colors-dark-gray);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const InfoContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-grow: 1;
  list-style-type: none;

  @media only screen and (max-width: 1024px) {
    flex-direction: row;
  }
`;

export const Info = styled.li`
  font-family: var(--font-special);
  font-size: 1.1rem;
  color: var(--colors-dark-gray);
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
