import React from 'react';
import Loading from 'components/Loading';
import SignUpForm from 'components/Forms/SignUpForm';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const SignUp = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.HOME, redirectIfFound: true });

  return user && !user.isLoggedIn ? <SignUpForm /> : <Loading />;
};

export default SignUp;
