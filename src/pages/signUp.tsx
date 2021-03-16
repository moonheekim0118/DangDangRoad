import React from 'react';
import { Loading } from 'components/ui';
import { SignUp } from 'components/auth';
import { useUser } from 'hooks';
import routes from 'common/constant/routes';

const SignUpPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? <SignUp /> : <Loading />;
};

export default SignUpPage;
