import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../remotes/sign';
import useInput from './useInput';

/** sign in logics */
const useSignIn = () => {
  const router = useRouter();
  const [email, emailChangeHandler] = useInput();
  const [password, PasswordChangeHandler] = useInput();
  const [ErrorMessage, setErrorMessage] = useState<string>('');

  const SignInHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (email.length === 0 || password.length === 0) {
        setErrorMessage('정보를 올바르게 입력해주세요');
      }
      const response = await signIn(email, password);
      if (response.isError) {
        return setErrorMessage(response.errorMessage);
      }
      router.push('/'); // push to index page
    },
    [email, password]
  );

  return [
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    ErrorMessage,
  ] as const;
};

export default useSignIn;
