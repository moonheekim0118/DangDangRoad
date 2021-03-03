import { useEffect, useCallback } from 'react';
import { useValidation, useMatch, useInput } from 'hooks';
import useApiFetch, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { signUp } from 'api/sign';
import Router from 'next/router';
import * as checkers from 'util/signUpValidations';

// sign up logic
const useSignUp = () => {
  const dispatch = useNotificationDispatch();
  const [fetchResult, fetchDispatch] = useApiFetch(signUp);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push('/signUpInProcess');
        break;
      case FAILURE:
        dispatch(showError(fetchResult.error));
    }
  }, [fetchResult]);

  /** email */
  const {
    value: email,
    error: emailError,
    valueChangeHanlder: EmailChangeHandler,
    setError: setEmailError,
  } = useValidation({
    characterCheck: checkers.checkEmail,
  });

  /** nickname */
  const {
    value: nickname,
    error: nicknameError,
    valueChangeHanlder: NicknameChangeHandler,
    setError: setNicknameError,
  } = useValidation({
    characterCheck: checkers.nicknameValidator,
  });

  /** password */
  const {
    value: password,
    error: passwordError,
    valueChangeHanlder: PasswordChangeHandler,
    setError: setPasswordError,
  } = useValidation({
    characterCheck: checkers.passwordValidator,
  });
  /** password check */
  const [passwordCheck, PasswordCheckChangeHandler] = useInput();

  /** password match checker */
  const passwordMatch = useMatch({ value: passwordCheck, target: password });

  /** submit handler */
  const SubmitHanlder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (
        email.length === 0 ||
        nickname.length === 0 ||
        password.length === 0 ||
        passwordCheck.length === 0 ||
        emailError ||
        nicknameError ||
        passwordError ||
        !passwordMatch
      ) {
        if (email.length === 0) setEmailError(true);
        if (nickname.length === 0) setNicknameError(true);
        if (password.length === 0) setPasswordError(true);
        return;
      }
      fetchDispatch({ type: REQUEST, params: [{ email, nickname, password }] });
    },
    [
      email,
      nickname,
      password,
      passwordCheck,
      emailError,
      nicknameError,
      passwordError,
      passwordMatch,
    ]
  );

  return {
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
  };
};

export default useSignUp;
