import React from 'react';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Alert from 'atoms/Alert';
import useSignUp from 'hooks/useSignUp';
import { inputId } from 'types/Input';
import * as S from '../style';

const SignUpForm = (): React.ReactElement => {
  const [
    /** email value */
    email,
    /** email value error */
    emailError,
    /** email value change handler function */
    EmailChangeHandler,
    /** nickname value */
    nickname,
    /** nickname value error */
    nicknameError,
    /** nickname value change handler fucntion */
    NicknameChangeHandler,
    /** password value */
    password,
    /** password value error */
    passwordError,
    /** password value change handler function */
    PasswordChangeHandler,
    /** check password value */
    passwordCheck,
    /** error if passwords match  */
    passwordMatch,
    /** check password change handler function */
    PasswordCheckChangeHandler,
    /** fomr sumbit handler */
    SubmitHanlder,
    /** error message */
    ErrorMessage,
  ] = useSignUp();
  return (
    <S.Form signUp={true}>
      <S.Title>SIGN UP</S.Title>
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
      <S.ButtonContainer>
        <Button
          color="blue"
          hoverColor="light-blue"
          type="submit"
          onClick={SubmitHanlder}>
          JOIN
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default SignUpForm;
