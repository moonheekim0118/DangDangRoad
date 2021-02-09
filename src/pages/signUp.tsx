import React from 'react';
import Layout from '../components/Layout';
import useSignUp from '../hooks/useSignUp';
import SignUpForm from '../components/Forms/SignUpForm';
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

const SignUp = () => {
  /** logic */
  const [
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
  ] = useSignUp();

  return (
    <Layout>
      <SignUpForm
        email={email}
        emailError={emailError}
        EmailChangeHandler={EmailChangeHandler}
        password={password}
        passwordError={passwordError}
        PasswordChangeHandler={PasswordChangeHandler}
        passwordCheck={passwordCheck}
        passwordMatch={passwordMatch}
        PasswordCheckChangeHandler={PasswordCheckChangeHandler}
        SubmitHanlder={SubmitHanlder}
        ErrorMessage={ErrorMessage}
      />
    </Layout>
  );
};

export default withNotAuth(SignUp);
