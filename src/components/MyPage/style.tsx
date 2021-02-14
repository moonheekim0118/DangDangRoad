import styled from '@emotion/styled';

export const Container = styled.article`
  width: 60%;
  height: 80%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  @media only screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }
`;
