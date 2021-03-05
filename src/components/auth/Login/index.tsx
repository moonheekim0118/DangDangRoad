import React from 'react';
import GoogleButton from 'react-google-button';
import { Input, Button } from 'atoms';
import { saveBtnStyle } from 'common/style/baseStyle';
import { MENU_LOGIN_TITLE } from 'common/constant/string';
import { inputId } from 'common/constant/input';
import { useSignIn } from 'hooks';
import * as S from '../style';

const Login = (): React.ReactElement => {
  const data = useSignIn();

  return (
    <S.Form>
      <S.Title>{MENU_LOGIN_TITLE}</S.Title>
      <Input
        type="text"
        id={inputId.EMAIL}
        value={data.email}
        onChange={data.emailChangeHandler}
        required={true}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={data.password}
        onChange={data.PasswordChangeHandler}
        required={true}
      />
      <S.ButtonContainer>
        <Button
          className="loginBtn"
          css={saveBtnStyle}
          type="submit"
          onClick={data.SignInHandler}>
          {MENU_LOGIN_TITLE}
        </Button>
        <GoogleButton onClick={data.GoogleSignInHandler} />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default Login;
