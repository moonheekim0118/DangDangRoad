import { useCallback } from 'react';
import { signIn, googleSignIn } from 'api/sign';
import { checkEmail } from 'util/signUpValidations';
import Router from 'next/router';
import useAlert from 'hooks/useAlert';
import useInput from 'hooks/useInput';

/** sign in logics */
const useSignIn = () => {
  const { alertMessage, setAlertMessage, closeAlertHandler } = useAlert();
  const [email, emailChangeHandler] = useInput();
  const [password, PasswordChangeHandler] = useInput();

  const SignInHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (email.length === 0 || password.length === 0 || !checkEmail(email)) {
        return setAlertMessage('정보를 올바르게 입력해주세요');
      }
      const response = await signIn(email, password);
      if (response.errorMessage) {
        return setAlertMessage(response.errorMessage);
      }
      Router.push('/'); // push to index page
    },
    [email, password]
  );

  const GoogleSignInHandler = useCallback(async () => {
    const response = await googleSignIn();
    if (response.errorMessage) {
      return setAlertMessage(response.errorMessage);
    }
    Router.push('/');
  }, []);

  return {
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    GoogleSignInHandler,
    alertMessage,
    closeAlertHandler,
  };
};

export default useSignIn;
