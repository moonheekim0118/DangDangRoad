import styled from '@emotion/styled';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 500px) {
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
  @media only screen and (max-width: 500px) {
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

  @media only screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const TitleContainer = styled.span`
  position: absolute;
  top: 15px;
  right: 20px;
`;
