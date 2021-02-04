import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import useInput from '../../../hooks/useInput';
import { inputId } from '../../../model/inputIds';
import styled from '@emotion/styled';

const LoginForm = () => {
  const [id, IdChangeHandler] = useInput();
  const [password, PasswordChangeHandler] = useInput();
  return (
    <Form>
      <Input
        type="text"
        id={inputId.ID}
        value={id}
        inputChangeHandler={IdChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={password}
        inputChangeHandler={PasswordChangeHandler}
      />
      <Button color="blue">LOGIN</Button>
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
