import React, { useEffect, useRef } from 'react';
import { useApiFetch, usePasswordCheck } from 'hooks';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
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
import * as S from '../style';
import {
  emailValidator,
  conditionValidator,
  nicknameValidator,
  passwordValidator,
} from 'util/validations';

const SignUp = (): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [result, dispatch] = useApiFetch(signUp);
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
    switch (result.type) {
      case SUCCESS:
        Router.push(routes.SIGNUP_PROCESS);
        break;
      case FAILURE:
        notiDispatch(showError(result.error));
        break;
    }
  }, [result]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    if (emailError || nicknameError || passwordError) return;

    const isFullEmail = conditionValidator(email.length > 0, emailFocus);
    const isFullNickname = conditionValidator(
      nickname.length > 0,
      nicknameFocus
    );
    const isFullPassword = conditionValidator(
      password.length > 0,
      passwordFocus
    );
    const isCorrectPassword = conditionValidator(
      password === passwordCheck,
      passwordCheckFoucs
    );
    if (
      !isFullEmail ||
      !isFullNickname ||
      !isFullPassword ||
      !isCorrectPassword
    )
      return;
    dispatch({ type: REQUEST, params: [{ email, nickname, password }] });
  };

  return (
    <S.Form signUp={true} onSubmit={handleSubmit}>
      <S.Title>{MENU_SIGNUP_TITLE}</S.Title>
      <Input
        type="email"
        id={inputId.EMAIL}
        required={true}
        ref={emailRef}
        validator={emailValidator}
      />
      <Input
        type="text"
        id={inputId.NICKNAME}
        required={true}
        ref={nicknameRef}
        validator={nicknameValidator}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        required={true}
        ref={passwordRef}
        validator={passwordValidator}
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
          loading={result.type === REQUEST}>
          {SIGNUP_BUTTON_CAPTION}
        </Button>
        <GoogleLoginButton />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default SignUp;
