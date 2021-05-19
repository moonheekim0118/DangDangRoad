import React, { useEffect, useRef, useCallback, FormEvent } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { signIn } from 'api/sign';
import { NOT_FULL_INFO_ERROR } from 'common/constant/string';
import { InputRef, inputDefaultRef } from 'types/Ref';
import { MENU_LOGIN_TITLE } from 'common/constant/string';
import { inputId } from 'common/constant/input';
import { Input, Button } from 'components/UI';
import { GoogleLoginButton } from 'components/Auth';
import { showError } from 'action';
import { loginValidator } from 'util/validations';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as S from '../style';

const Login = (): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const emailRef = useRef<InputRef>(inputDefaultRef());
  const passwordRef = useRef<InputRef>(inputDefaultRef());
  const [result, dispatch] = useApiFetch(signIn);

  useEffect(() => {
    switch (result.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        return;
      case FAILURE:
        notiDispatch(showError(result.error));
        return;
    }
  }, [result]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!loginValidator(email, password)) {
      return notiDispatch(showError(NOT_FULL_INFO_ERROR));
    }
    dispatch({ type: REQUEST, params: [{ email, password }] });
  }, []);

  return (
    <S.Form onSubmit={handleSubmit}>
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
          loading={result.type === REQUEST}>
          {MENU_LOGIN_TITLE}
        </Button>
        <GoogleLoginButton />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default Login;
