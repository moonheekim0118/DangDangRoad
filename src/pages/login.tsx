import React from 'react';
import Loading from 'components/Loading';
import LoginForm from 'components/Forms/LoginForm';
import useUser from 'libs/useUser';

const Login = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: '/', redirectIfFound: true });

  return user && !user.isLoggedIn ? <LoginForm /> : <Loading />;
};

export default Login;
