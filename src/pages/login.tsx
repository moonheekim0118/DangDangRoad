import React from 'react';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import LoginForm from 'components/Forms/LoginForm';
import useWithNotAuth from 'hooks/useWithNotAuth';

const Login = (): React.ReactElement => {
  useLoginCheck();
  const renderable = useWithNotAuth();

  return renderable ? <LoginForm /> : <Loading />;
};

export default Login;
