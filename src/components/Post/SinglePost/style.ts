import styled from '@emotion/styled';
import { baseButtonStyle } from 'common/style/baseStyle';
import { colorCode } from 'common/style/color';
import { css } from '@emotion/react';

export const updateButtonStyle = css`
  background-color: #fff;
  color: ${colorCode['blue']};
  border: 1px solid ${colorCode['blue']};
  ${baseButtonStyle}
  width:40%;

  &:hover {
    background-color: rgba(128, 191, 255, 0.2);
  }
`;

export const deleteButtonStyle = css`
  background-color: #fff;
  color: ${colorCode['red']};
  border: 1px solid ${colorCode['red']};
  width: 40%;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 25px;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
  }
`;

export const ContentsContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    min-height: 300px;
  }
`;

export const UserContentsContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-align;
  align-items: center;
  gap: 25px;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    min-height: 300px;
  }
`;

export const PlaceName = styled.span`
  text-align: cetner;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.8rem;
  color: ${colorCode['blue']};
`;

export const PlaceDetail = styled.span`
  text-align: center;
  font-size: 0.9rem;
  color: ${colorCode['dark-gray']};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

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
  border-radius: 25px;
  padding: 15px;
`;

export const AdminContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
