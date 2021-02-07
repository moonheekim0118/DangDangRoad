import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import Alert from '../../../atoms/Alert';
import { inputId } from '../../../model/inputIds';
import styled from '@emotion/styled';

type handlerFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  email: string;
  emailChangeHandler: handlerFunction;
  password: string;
  PasswordChangeHandler: handlerFunction;
  SubmitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ErrorMessage: string;
}

const LoginForm = ({
  email,
  emailChangeHandler,
  password,
  PasswordChangeHandler,
  SubmitHandler,
  ErrorMessage,
}: Props) => {
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
      <Button color="blue" type="submit" onClick={SubmitHandler}>
        LOGIN
      </Button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  padding: 15px 25px;
  border-radius: 10px;
  background-color: #fff;
`;

export default LoginForm;
