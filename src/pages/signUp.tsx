import React from 'react';
import Loading from 'components/ui/Loading';
import { SignUp } from 'components/auth';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const SignUpPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? <SignUp /> : <Loading />;
};

export default SignUpPage;
