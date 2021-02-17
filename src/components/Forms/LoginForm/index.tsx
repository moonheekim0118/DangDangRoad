import React from 'react';
import GoogleButton from 'react-google-button';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Alert from 'atoms/Alert';
import useSignIn from 'hooks/useSignIn';
import { inputId } from 'types/Input';
import * as S from '../style';

const LoginForm = (): React.ReactElement => {
  const data = useSignIn();

  return (
    <S.Form>
      <S.Title>LOGIN</S.Title>
      {data.alertMessage !== '' && (
        <Alert type="error" closeAlertHandler={data.closeAlertHandler}>
          {data.alertMessage}
        </Alert>
      )}
      <Input
        type="text"
        id={inputId.EMAIL}
        value={data.email}
        inputChangeHandler={data.emailChangeHandler}
        required={true}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={data.password}
        inputChangeHandler={data.PasswordChangeHandler}
        required={true}
      />
      <S.ButtonContainer>
        <Button
          color="blue"
          hoverColor="light-blue"
          type="submit"
          onClick={data.SignInHandler}>
          LOGIN
        </Button>
        <GoogleButton onClick={data.GoogleSignInHandler} />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default LoginForm;
