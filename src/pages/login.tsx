import React from 'react';
import useLoginCheck from 'hooks/useLoginCheck';
import LoginForm from 'components/Forms/LoginForm';
import withNotAuth from 'helpers/withNotAuth';

const Login = (): React.ReactElement => {
  // change isLoggedIn state by props authenticated
  useLoginCheck();

  return <LoginForm />;
};

export default withNotAuth(Login);
