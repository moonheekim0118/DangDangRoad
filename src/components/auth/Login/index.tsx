import React, { useEffect, useRef, useCallback, FormEvent } from 'react';
import { checkEmail } from 'util/signUpValidations';
import { useApiFetch } from 'hooks';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { signIn } from 'api/sign';
import { NOT_FULL_INFO_ERROR } from 'common/constant/string';
import { InputRef, inputDefaultRef } from 'types/Ref';
import { MENU_LOGIN_TITLE } from 'common/constant/string';
import { inputId } from 'common/constant/input';
import { Input, Button } from 'components/ui';
import { GoogleLoginButton } from 'components/auth';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';
import * as S from '../style';

const Login = (): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const emailRef = useRef<InputRef>(inputDefaultRef());
  const passwordRef = useRef<InputRef>(inputDefaultRef());
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(signIn);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        break;
      case FAILURE:
        notiDispatch(Action.showError(fetchResult.error));
        setDefault();
    }
  }, [fetchResult]);

  /** submit handler */
  const SignInHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email.length === 0 || password.length === 0 || !checkEmail(email)) {
      return notiDispatch(Action.showError(NOT_FULL_INFO_ERROR));
    }
    fetchDispatch({ type: REQUEST, params: [{ email, password }] });
  }, []);

  return (
    <S.Form onSubmit={SignInHandler}>
      <S.Title>{MENU_LOGIN_TITLE}</S.Title>
      <Input type="email" id={inputId.EMAIL} required={true} ref={emailRef} />
      <Input
        type="password"
        id={inputId.PASSWORD}
        ref={passwordRef}
        required={true}
      />
      <S.ButtonContainer>
        <Button
          type="submit"
          theme="primary"
          size="large"
          width="100%"
          loading={fetchResult.type === REQUEST}>
          {MENU_LOGIN_TITLE}
        </Button>
        <GoogleLoginButton />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default Login;
