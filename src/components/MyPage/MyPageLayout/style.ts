import styled from '@emotion/styled';
import { baseModalStyle } from 'common/style/baseStyle';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 570px) {
    flex-direction: column;
  }
`;

export const SideContainer = styled.aside`
  width: 250px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 25px;
  @media only screen and (max-width: 570px) {
    width: 100%;
    margin: 0;
  }
`;

export const MainContainer = styled.article`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  @media only screen and (max-width: 570px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const TitleContainer = styled.span`
  position: absolute;
  top: 15px;
  right: 20px;
`;

export const DestroyConfirmContainer = styled.div`
  width: 570px;
  height: 350px;
  border-radius: 25px;
  background-color: #fff;
  padding: 25px;
  white-space: pre-wrap;
  line-height: 1.6;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

  ${baseModalStyle};
  @media only screen and (max-width: 570px) {
    width: 100%;
  }
`;

export const DestroyTitle = styled.div`
  margin: 10px 0;
  font-weight: bold;
  color: red;
  width: 100%;
  text-align: center;
`;

export const DestroyButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
