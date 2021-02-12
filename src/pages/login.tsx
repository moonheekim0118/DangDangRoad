import React from 'react';
import useSignIn from 'hooks/useSignIn';
import Layout from 'components/Layout';
import LoginForm from 'components/Forms/LoginForm';
import withNotAuth from 'helpers/withNotAuth';
import getAuthentication from 'libs/getAuthentication';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getAuthentication(context);

const Login = () => {
  const [
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    GoogleSignInHandler,
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
        GoogleSignInHandler={GoogleSignInHandler}
        ErrorMessage={ErrorMessage}
      />
    </Layout>
  );
};

export default withNotAuth(Login);
