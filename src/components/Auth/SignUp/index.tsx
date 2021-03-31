import React, { useEffect, useRef, useCallback, FormEvent } from 'react';
import { usePasswordCheck } from 'hooks';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { signUp } from 'api/sign';
import { InputRef, inputDefaultRef, RefType, defaultRef } from 'types/Ref';
import { Input, Button } from 'components/UI';
import { inputId } from 'common/constant/input';
import {
  TERM_NOT_CHECKED_ERROR,
  MENU_SIGNUP_TITLE,
  SIGNUP_BUTTON_CAPTION,
  PRIVACY_TERM_TITLE,
  SERVICE_TERM_TITLE,
} from 'common/constant/string';
import { SERVICE_TERM, PRIVACY_TERM } from 'common/constant/terms';
import { SignUpTerm, GoogleLoginButton } from 'components/Auth';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as checkers from 'util/signUpValidations';
import * as S from '../style';

const SignUp = (): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [signUpResult, signUpFetch, signUpSetDefault] = useApiFetch(signUp);
  const emailRef = useRef<InputRef>(inputDefaultRef());
  const nicknameRef = useRef<InputRef>(inputDefaultRef());
  const [
    passwordRef,
    passwordCheckRef,
    passwordCheckValidator,
  ] = usePasswordCheck();
  const serviceTermCheckRef = useRef<RefType<boolean>>(defaultRef(false));
  const privacyTermCheckRef = useRef<RefType<boolean>>(defaultRef(false));

  useEffect(() => {
    switch (signUpResult.type) {
      case SUCCESS:
        Router.push(routes.SIGNUP_PROCESS);
        break;
      case FAILURE:
        notiDispatch(showError(signUpResult.error));
        signUpSetDefault();
    }
  }, [signUpResult]);

  /** submit handler */
  const submitHanlder = useCallback((e: FormEvent<HTMLFormElement>) => {
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

    const serviceTermChecked = serviceTermCheckRef.current.value;
    const privacyTermChecked = privacyTermCheckRef.current.value;

    if (!serviceTermChecked || !privacyTermChecked) {
      return notiDispatch(showError(TERM_NOT_CHECKED_ERROR));
    }
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
      password !== passwordCheck && passwordCheckFoucs && passwordCheckFoucs();
      return;
    }
    signUpFetch({ type: REQUEST, params: [{ email, nickname, password }] });
  }, []);

  return (
    <S.Form signUp={true} onSubmit={submitHanlder}>
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
      <SignUpTerm
        label={SERVICE_TERM_TITLE}
        termContents={SERVICE_TERM}
        ref={serviceTermCheckRef}
      />
      <SignUpTerm
        label={PRIVACY_TERM_TITLE}
        termContents={PRIVACY_TERM}
        ref={privacyTermCheckRef}
      />
      <S.ButtonContainer>
        <Button
          type="submit"
          theme="primary"
          size="large"
          width="100%"
          loading={signUpResult.type === REQUEST}>
          {SIGNUP_BUTTON_CAPTION}
        </Button>
        <GoogleLoginButton />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default SignUp;
