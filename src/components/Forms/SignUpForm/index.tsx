import React from 'react';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Alert from 'atoms/Alert';
import styled from '@emotion/styled';
import { inputId } from 'types/inputIds';

type handlerFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Props {
  /** email value */
  email: string;
  /** email error */
  emailError: boolean;
  /** email Change Handler function */
  EmailChangeHandler: handlerFunction;
  /** nickname value */
  nickname: string;
  /** nickname error  */
  nicknameError: boolean;
  /** nickname change handler function00 */
  NicknameChangeHandler: handlerFunction;
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
  /** general Error Message */
  ErrorMessage: string;
}

const SignUpForm = ({
  email,
  emailError,
  EmailChangeHandler,
  nickname,
  nicknameError,
  NicknameChangeHandler,
  password,
  passwordError,
  PasswordChangeHandler,
  passwordCheck,
  passwordMatch,
  PasswordCheckChangeHandler,
  SubmitHanlder,
  ErrorMessage,
}: Props): React.ReactElement => {
  return (
    <Form>
      {ErrorMessage.length > 0 && <Alert type="error">{ErrorMessage}</Alert>}
      <Input
        type="text"
        id={inputId.EMAIL}
        value={email}
        error={emailError}
        required={true}
        inputChangeHandler={EmailChangeHandler}
      />
      <Input
        type="text"
        id={inputId.NICKNAME}
        value={nickname}
        error={nicknameError}
        required={true}
        inputChangeHandler={NicknameChangeHandler}
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
      <Button
        color="blue"
        hoverColor="light-blue"
        type="submit"
        onClick={SubmitHanlder}>
        JOIN
      </Button>
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

export default SignUpForm;
