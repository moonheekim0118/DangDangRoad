import React from 'react';
import Loading from 'components/Loading';
import SignUpForm from 'components/Forms/SignUpForm';
import useUser from 'libs/useUser';

const SignUp = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: '/', redirectIfFound: true });

  return user && !user.isLoggedIn ? <SignUpForm /> : <Loading />;
};

export default SignUp;
