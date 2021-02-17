import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signUp } from 'api/sign';
import * as checkers from 'util/signUpValidations';
import useAlert from 'hooks/useAlert';
import useValidation from 'hooks/useValidation';
import useMatch from 'hooks/useMatch';
import useInput from 'hooks/useInput';

const useSignUp = () => {
  const { alertMessage, setAlertMessage, closeAlertHandler } = useAlert();

  /** email */
  const router = useRouter();
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

  const passwordMatch = useMatch({ value: passwordCheck, target: password });

  const SubmitHanlder = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      const response = await signUp(email, nickname, password);
      if (response.errorMessage) {
        return setAlertMessage(response.errorMessage);
      }
      router.push('/signUpInProcess');
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
    alertMessage,
    closeAlertHandler,
  };
};

export default useSignUp;
