import React from 'react';
import GoogleButton from 'react-google-button';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Alert from 'atoms/Alert';
import { inputId } from 'types/inputIds';
import styled from '@emotion/styled';

type handlerFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  /** email value */
  email: string;
  /** email value change handler */
  emailChangeHandler: handlerFunction;
  /** password value */
  password: string;
  /** password value change handler */
  PasswordChangeHandler: handlerFunction;
  /** submit handler function */
  SubmitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** error message about login */
  GoogleSignInHandler: () => void;
  ErrorMessage: string;
}

const LoginForm = ({
  email,
  emailChangeHandler,
  password,
  PasswordChangeHandler,
  SubmitHandler,
  GoogleSignInHandler,
  ErrorMessage,
}: Props): React.ReactElement => {
  return (
    <Form>
      {ErrorMessage.length > 0 && <Alert type="error">{ErrorMessage}</Alert>}
      <Input
        type="text"
        id={inputId.EMAIL}
        value={email}
        inputChangeHandler={emailChangeHandler}
        required={true}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={password}
        inputChangeHandler={PasswordChangeHandler}
        required={true}
      />
      <ButtonContainer>
        <Button
          color="blue"
          hoverColor="light-blue"
          type="submit"
          onClick={SubmitHandler}>
          LOGIN
        </Button>
        <GoogleButton onClick={GoogleSignInHandler} />
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
  width: 600px;
  height: 100%;
  padding: 15px 25px;
  border-radius: 10px;
  background-color: #fff;

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 20%;
`;

export default LoginForm;
