import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import styled from '@emotion/styled';
import useSignUp from '../../../hooks/useSignUp';
import { inputId } from '../../../model/inputIds';

const SignUpForm = () => {
  const [
    email,
    emailError,
    EmailChangeHandler,
    password,
    passwordError,
    PasswordChangeHandler,
    passwordCheck,
    passwordMatch,
    PasswordCheckChangeHandler,
    SubmitHanlder,
  ] = useSignUp();
  return (
    <Form>
      <Input
        type="text"
        id={inputId.EMAIL}
        value={email}
        error={emailError}
        required={true}
        inputChangeHandler={EmailChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={password}
        error={passwordError}
        required={true}
        inputChangeHandler={PasswordChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORDCHECK}
        value={passwordCheck}
        error={!passwordMatch}
        required={true}
        inputChangeHandler={PasswordCheckChangeHandler}
      />
      <Button color="blue" type="submit" onClick={SubmitHanlder}>
        JOIN
      </Button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%:
  height: 100%;
  padding: 15px 25px;
  border-radius: 10px;
  background-color: #fff;

`;

export default SignUpForm;
