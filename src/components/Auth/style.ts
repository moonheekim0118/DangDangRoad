import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const popUp = keyframes`
   100% {
    transform: translateY(0%);
   }
`;

export const Form = styled.form<{ signUp?: boolean }>`
  width: 600px;
  margin: 25px 0;
  padding: 15px 25px;
  border-radius: 20px;
  background-color: #fff;
  transform: translateY(100%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  animation: ${popUp} 0.8s ease forwards;

  > * {
    margin: 1rem 0;
  }

  @media only screen and (max-width: 780px) {
    width: 100%;
    height: 100%;
    box-shadow: 0;
    border-radius: 0;
  }
`;

export const Title = styled.span`
  font-family: var(--font-special);
  font-size: 1.6rem;
  color: var(--colors-blue);
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 135px;
`;

export const GoogleLoginButton = styled.button`
  color: #fff;
  background-color: var(--colors-light-blue);
  padding: 14px 20px;
  text-align: center;
`;
