import { useEffect, useCallback } from 'react';
import { checkEmail } from 'util/signUpValidations';
import { useInput } from 'hooks';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { signIn, googleSignIn } from 'api/sign';
import { NOT_FULL_INFO_ERROR } from 'common/constant/string';
import routes from 'common/constant/routes';
import Router from 'next/router';

/** sign in logics */
const useSignIn = () => {
  const dispatch = useNotificationDispatch();
  const [signInResult, signInDispatch] = useApiFetch(signIn);
  const [googleSignInResult, googleSignInDispatch] = useApiFetch(googleSignIn);

  /** email */
  const [email, emailChangeHandler] = useInput();

  /** password */
  const [password, PasswordChangeHandler] = useInput();

  useEffect(() => {
    switch (signInResult.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        break;
      case FAILURE:
        dispatch(showError(signInResult.error));
    }
  }, [signInResult]);

  useEffect(() => {
    switch (googleSignInResult.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        break;
      case FAILURE:
        dispatch(showError(googleSignInResult.error));
    }
  }, [googleSignInResult]);

  /** submit handler */
  const SignInHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (email.length === 0 || password.length === 0 || !checkEmail(email)) {
        return dispatch(showError(NOT_FULL_INFO_ERROR));
      }
      signInDispatch({ type: REQUEST, params: [{ email, password }] });
    },
    [email, password]
  );

  /** Google sign in handler */
  const GoogleSignInHandler = useCallback(async () => {
    googleSignInDispatch({ type: REQUEST });
  }, []);

  return {
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    GoogleSignInHandler,
  };
};

export default useSignIn;
