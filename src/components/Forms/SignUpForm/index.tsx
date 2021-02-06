import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import styled from '@emotion/styled';
import { inputId } from '../../../model/inputIds';

type handlerFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  /** email value */
  email: string;
  /** email error */
  emailError: boolean;
  /** email Change Handler function */
  EmailChangeHandler: handlerFunction;
  /** password value */
  password: string;
  /** password error  */
  passwordError: boolean;
  /** password change Handler function */
  PasswordChangeHandler: handlerFunction;
  /** double check password value*/
  passwordCheck: string;
  /** double check password error  */
  passwordMatch: boolean;
  /** double check password change handler function */
  PasswordCheckChangeHandler: handlerFunction;
  /** submit handler function */
  SubmitHanlder: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SignUpForm = ({
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
}: Props) => {
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
