import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import useMatch from '../../../hooks/useMatch';
import useValidation from '../../../hooks/useValidation';
import styled from '@emotion/styled';
import { inputId } from '../../../model/inputIds';

const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

const validatePassword = (password: string): boolean => {
  const re = /\s/;
  return !re.test(password);
};

const SignUpForm = () => {
  /** email */
  const [email, emailError, IdChangeHandler] = useValidation({
    max: 100,
    min: 5,
    characterCheck: validateEmail,
  });
  /** password */
  const [password, passwordError, PasswordChangeHandler] = useValidation({
    max: 16,
    min: 6,
    characterCheck: validatePassword,
  });
  /** password check */
  const [passwordCheck, , PasswordCheckChangeHandler] = useValidation({
    max: 16,
    min: 6,
  });

  const passwordMatch = useMatch({ value: passwordCheck, target: password });

  return (
    <Form>
      <Input
        type="text"
        id={inputId.EMAIL}
        value={email}
        error={emailError}
        required={true}
        inputChangeHandler={IdChangeHandler}
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
      <Button color="blue"> JOIN</Button>
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
