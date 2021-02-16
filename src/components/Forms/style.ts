import styled from '@emotion/styled';
import { colorCode } from 'types/Color';

export const Form = styled.form<{ signUp?: boolean }>`
  width: 600px;
  height: 90%;s
  padding: 15px 25px;
  border-radius: 20px;
  background-color: #fff;

  display: grid;
  place-items: center;

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);

  @media only screen and (max-width: 780px) {
    width: 100%;
    height: 100%;
    box-shadow: 0;
    border-radius: 0;
  }
`;

export const Title = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.6rem;
  color: ${colorCode['blue']};
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 150px;
`;
