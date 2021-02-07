import React from 'react';
import Layout from '../components/Layout';
import useSignIn from '../hooks/useSignIn';
import LoginForm from '../components/Forms/LoginForm';
import withNotAuth from '../helpers/withNotAuth';

const Login = () => {
  const [
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    ErrorMessage,
  ] = useSignIn();
  return (
    <Layout>
      <LoginForm
        email={email}
        emailChangeHandler={emailChangeHandler}
        password={password}
        PasswordChangeHandler={PasswordChangeHandler}
        SubmitHandler={SignInHandler}
        ErrorMessage={ErrorMessage}
      />
    </Layout>
  );
};

export default withNotAuth(Login);
