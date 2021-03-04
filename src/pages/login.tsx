import React from 'react';
import Loading from 'components/ui/Loading';
import { Login } from 'components/auth';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const LoginPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? <Login /> : <Loading />;
};

export default LoginPage;
