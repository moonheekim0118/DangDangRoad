import React from 'react';
import Layout from '../components/Layout';
import useSignUp from '../hooks/useSignUp';
import SignUpForm from '../components/Forms/SignUpForm';
import withNotAuth from '../helpers/withNotAuth';
import getAuthentication from '../libs/getAuthentication';

export const getServerSideProps = (context) => getAuthentication(context);

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
