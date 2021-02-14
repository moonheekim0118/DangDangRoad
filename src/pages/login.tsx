import React from 'react';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import LoginForm from 'components/Forms/LoginForm';
import useWithNotAuth from 'hooks/useWithNotAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const Login = (): React.ReactElement => {
  useLoginCheck();
  const { isLoggedIn, isLoaded } = useLoginInfoState();
  useWithNotAuth(isLoggedIn);

  if (!isLoggedIn && isLoaded) return <LoginForm />;
  return <Loading />;
};

export default Login;
