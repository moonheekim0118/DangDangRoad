import React from 'react';
import useSignIn from 'hooks/useSignIn';
import useLoginCheck from 'hooks/useLoginCheck';
import LoginForm from 'components/Forms/LoginForm';
import withNotAuth from 'helpers/withNotAuth';

const Login = (): React.ReactElement => {
  const [
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    GoogleSignInHandler,
    ErrorMessage,
  ] = useSignIn();

  // change isLoggedIn state by props authenticated
  useLoginCheck();

  return (
    <LoginForm
      email={email}
      emailChangeHandler={emailChangeHandler}
      password={password}
      PasswordChangeHandler={PasswordChangeHandler}
      SubmitHandler={SignInHandler}
      GoogleSignInHandler={GoogleSignInHandler}
      ErrorMessage={ErrorMessage}
    />
  );
};

export default withNotAuth(Login);
