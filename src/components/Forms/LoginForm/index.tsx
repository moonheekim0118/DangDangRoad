import React from 'react';
import GoogleButton from 'react-google-button';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Alert from 'atoms/Alert';
import useSignIn from 'hooks/useSignIn';
import { inputId } from 'types/Input';
import * as S from '../style';

const LoginForm = (): React.ReactElement => {
  const [
    /** email value */
    email,
    /** email change handler fucntion */
    emailChangeHandler,
    /** password value */
    password,
    /** password change handler function */
    PasswordChangeHandler,
    /** submit handler function */
    SubmitHandler,
    /** google sign in handelr funciton */
    GoogleSignInHandler,
    /** error Message */
    ErrorMessage,
  ] = useSignIn();

  return (
    <S.Form>
      <S.Title>LOGIN</S.Title>
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
      <S.ButtonContainer>
        <Button
          color="blue"
          hoverColor="light-blue"
          type="submit"
          onClick={SubmitHandler}>
          LOGIN
        </Button>
        <GoogleButton onClick={GoogleSignInHandler} />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default LoginForm;
