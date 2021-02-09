import React from 'react';
import useSignIn from '../hooks/useSignIn';
import Layout from '../components/Layout';
import LoginForm from '../components/Forms/LoginForm';
import withNotAuth from '../helpers/withNotAuth';

import { parseCookies } from 'nookies';
import 'firebase/auth';
import verifyCookie from '../remotes/verifyCookie';

export const getServerSideProps = async (context) => {
  let propsObject = {
    authenticated: false,
    usermail: '',
  };

  const cookies = parseCookies(context);

  if (cookies.user) {
    const authentication = await verifyCookie(cookies.user);
    propsObject.authenticated = authentication
      ? authentication.authenticated
      : false;
    propsObject.usermail = authentication ? authentication.usermail : '';
  }

  return {
    props: propsObject,
  };
};

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
