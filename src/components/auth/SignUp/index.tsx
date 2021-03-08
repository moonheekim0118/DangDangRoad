import React, { useEffect, useRef, useCallback } from 'react';
import { usePasswordCheck } from 'hooks';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { signUp } from 'api/sign';
import { inputRef, defaultRef } from 'types/Input';
import { Input, Button } from 'atoms';
import { saveBtnStyle } from 'common/style/baseStyle';
import { inputId } from 'common/constant/input';
import {
  MENU_SIGNUP_TITLE,
  SIGNUP_BUTTON_CAPTION,
} from 'common/constant/string';
import GoogleLoginButton from 'components/common/GoogleLoginButton';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as checkers from 'util/signUpValidations';
import * as S from '../style';

const SignUp = (): React.ReactElement => {
  const dispatch = useNotificationDispatch();
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(signUp);
  const emailRef = useRef<inputRef>(defaultRef);
  const nicknameRef = useRef<inputRef>(defaultRef);
  const [
    passwordRef,
    passwordCheckRef,
    passwordCheckValidator,
  ] = usePasswordCheck();

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push(routes.SIGNUP_PROCESS);
        break;
      case FAILURE:
        dispatch(showError(fetchResult.error));
        setDefault();
    }
  }, [fetchResult]);

  /** submit handler */
  const SubmitHanlder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const {
        value: email,
        error: emailError,
        focus: emailFocus,
      } = emailRef.current;
      const {
        value: nickname,
        error: nicknameError,
        focus: nicknameFocus,
      } = nicknameRef.current;
      const {
        value: password,
        error: passwordError,
        focus: passwordFocus,
      } = passwordRef.current;
      const {
        value: passwordCheck,
        focus: passwordCheckFoucs,
      } = passwordCheckRef.current;

      if (
        email.length === 0 ||
        nickname.length === 0 ||
        password.length === 0 ||
        password.length === 0 ||
        password !== passwordCheck ||
        emailError ||
        nicknameError ||
        passwordError
      ) {
        email.length === 0 && emailFocus && emailFocus();
        nickname.length === 0 && nicknameFocus && nicknameFocus();
        password.length === 0 && passwordFocus && passwordFocus();
        password !== passwordCheck &&
          passwordCheckFoucs &&
          passwordCheckFoucs();
        return;
      }
      fetchDispatch({ type: REQUEST, params: [{ email, nickname, password }] });
    },
    [emailRef, nicknameRef, passwordRef, passwordCheckRef]
  );

  return (
    <S.Form signUp={true}>
      <S.Title>{MENU_SIGNUP_TITLE}</S.Title>
      <Input
        type="email"
        id={inputId.EMAIL}
        required={true}
        ref={emailRef}
        validator={checkers.checkEmail}
      />
      <Input
        type="text"
        id={inputId.NICKNAME}
        required={true}
        ref={nicknameRef}
        validator={checkers.nicknameValidator}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        required={true}
        ref={passwordRef}
        validator={checkers.passwordValidator}
      />
      <Input
        type="password"
        id={inputId.PASSWORDCHECK}
        required={true}
        ref={passwordCheckRef}
        validator={passwordCheckValidator}
      />
      <S.ButtonContainer>
        <Button
          className="signBtn"
          css={saveBtnStyle}
          type="submit"
          onClick={SubmitHanlder}>
          {SIGNUP_BUTTON_CAPTION}
        </Button>
        <GoogleLoginButton />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default SignUp;
