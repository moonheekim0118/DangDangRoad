import React from 'react';
import useLoginCheck from 'hooks/useLoginCheck';
import SignUpForm from 'components/Forms/SignUpForm';
import withNotAuth from 'helpers/withNotAuth';

const SignUp = (): React.ReactElement => {
  // change isLoggedIn state by props authenticated
  useLoginCheck();
  return <SignUpForm />;
};

export default withNotAuth(SignUp);
