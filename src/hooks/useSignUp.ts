import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signUp } from 'remotes/sign';
import useValidation from 'hooks/useValidation';
import useMatch from 'hooks/useMatch';

const lengthTest = (value: string, max: number, min: number): boolean => {
  if (value.length > max || value.length < min) return false;
  return true;
};
const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

const validatePassword = (password: string): boolean => {
  const re = /\s/;

  return !re.test(password) && lengthTest(password, 16, 6);
};

const validateNickname = (nickname: string): boolean => {
  const re = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-10]+/;
  return re.test(nickname) && lengthTest(nickname, 10, 2);
};

const useSignUp = () => {
  /** email */
  const router = useRouter();
  const [email, emailError, EmailChangeHandler, setEmailError] = useValidation({
    characterCheck: validateEmail,
  });
  /** nickname */
  const [
    nickname,
    nicknameError,
    NicknameChangeHandler,
    setNicknameError,
  ] = useValidation({
    characterCheck: validateNickname,
  });
  /** password */
  const [
    password,
    passwordError,
    PasswordChangeHandler,
    setPasswordError,
  ] = useValidation({
    characterCheck: validatePassword,
  });
  /** password check */
  const [passwordCheck, , PasswordCheckChangeHandler] = useValidation({
    characterCheck: validatePassword,
  });

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
      if (response.isError) {
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
