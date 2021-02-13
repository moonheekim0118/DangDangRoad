import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signUp } from 'api/sign';
import * as checkers from 'util/signUpValidations';
import useValidation from 'hooks/useValidation';
import useMatch from 'hooks/useMatch';
import useInput from 'hooks/useInput';

const useSignUp = () => {
  /** email */
  const router = useRouter();
  const [email, emailError, EmailChangeHandler, setEmailError] = useValidation({
    characterCheck: checkers.checkEmail,
  });
  /** nickname */
  const [
    nickname,
    nicknameError,
    NicknameChangeHandler,
    setNicknameError,
  ] = useValidation({
    characterCheck: checkers.nicknameValidator,
  });
  /** password */
  const [
    password,
    passwordError,
    PasswordChangeHandler,
    setPasswordError,
  ] = useValidation({
    characterCheck: checkers.passwordValidator,
  });
  /** password check */
  const [passwordCheck, PasswordCheckChangeHandler] = useInput();

  /** general error */
  const [ErrorMessage, setErrorMessage] = useState<string>('');

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
        return setErrorMessage(response.errorMessage);
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

  return [
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
    ErrorMessage,
  ] as const;
};

export default useSignUp;
