import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import signUp from '../remotes/signUp';
import useValidation from './useValidation';
import useMatch from './useMatch';

const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

const validatePassword = (password: string): boolean => {
  const re = /\s/;
  return !re.test(password);
};

const useSignUp = () => {
  /** email */
  const router = useRouter();
  const [email, emailError, EmailChangeHandler, setEmailError] = useValidation({
    max: 100,
    min: 5,
    characterCheck: validateEmail,
  });
  /** password */
  const [
    password,
    passwordError,
    PasswordChangeHandler,
    setPasswordError,
  ] = useValidation({
    max: 16,
    min: 6,
    characterCheck: validatePassword,
  });
  /** password check */
  const [passwordCheck, , PasswordCheckChangeHandler] = useValidation({
    max: 16,
    min: 6,
  });

  /** general error */
  const [ErrorMessage, setErrorMessage] = useState<string>('');

  const passwordMatch = useMatch({ value: passwordCheck, target: password });

  const SubmitHanlder = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (
        email.length === 0 ||
        password.length === 0 ||
        passwordCheck.length === 0 ||
        emailError ||
        passwordError ||
        !passwordMatch
      ) {
        if (email.length === 0) setEmailError(true);
        if (password.length === 0) setPasswordError(true);
        return;
      }
      const response = await signUp(email, password);
      if (response.isError) {
        return setErrorMessage(response.errorMessage);
      }
      router.push('/signUpInProcess');
    },
    [email, password, passwordCheck, emailError, passwordError, passwordMatch]
  );

  return [
    email,
    emailError,
    EmailChangeHandler,
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
