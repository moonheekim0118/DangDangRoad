import styled from '@emotion/styled';
import { colorCode } from 'types/colorCode';

export const Form = styled.form<{ signUp?: boolean }>`
  width: 600px;
  height: ${(props) => (props.signUp ? '100%' : '600px')};
  padding: 15px 25px;
  border-radius: 20px;
  background-color: #fff;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
