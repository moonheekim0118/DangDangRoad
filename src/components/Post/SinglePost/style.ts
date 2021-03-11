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

import { baseModalStyle } from 'common/style/baseStyle';

export const Wrapper = styled.div<{ isModal: boolean }>`
  width: 80vw;
  height: 80vh;
  margin: ${(props) => !props.isModal && '25px 0'};
  background-color: #fff;
  border-radius: 20px;
  border: ${(props) => !props.isModal && '2px solid #f4f4f4'};
  box-shadow: ${(props) =>
    props.isModal && '0px 0px 5px 0px rgba(0, 0, 0, 0.75)'};

  ${(props) => props.isModal && baseModalStyle};
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

export const Header = styled.div`
  position: sticky;
  top: -25px;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 7000;
  display: none;
  text-align: cetner;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.8rem;
  color: ${colorCode['blue']};
  padding: 10px;

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
