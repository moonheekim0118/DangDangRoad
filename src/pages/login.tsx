import React from 'react';
import useSignIn from '../hooks/useSignIn';
import Layout from '../components/Layout';
import LoginForm from '../components/Forms/LoginForm';
import withNotAuth from '../helpers/withNotAuth';
import getAuthentication from '../libs/getAuthentication';

export const getServerSideProps = (context) => getAuthentication(context);

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
