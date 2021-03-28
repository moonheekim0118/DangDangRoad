import styled from '@emotion/styled';

export const Post = styled.div`
  width: 300px;
  height: 300px;
  cursor: pointer;

  @media only screen and (max-width: 380px) {
    width: 100%;
    height: 100%;
  }
`;
export const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.5s linear 0.2s;
  opacity: ${(props) => (props.loaded ? '1' : '0')};
`;

export const Overlay = styled.div`
  opacity: 0;
  display: grid;
  place-items: center;
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2000;

  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  @media only screen and (max-width: 380px) {
    width: 100%;
    height: 100%;
  }
`;

export const Description = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlaceName = styled.span`
  max-height: 80px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.6rem;
`;

export const CommentsInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > * {
    margin: 0 0.5rem;
  }
`;
