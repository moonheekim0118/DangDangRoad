import React from 'react';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import SignUpForm from 'components/Forms/SignUpForm';
import useWithNotAuth from 'hooks/useWithNotAuth';

const SignUp = (): React.ReactElement => {
  useLoginCheck();
  const renderable = useWithNotAuth();

  return renderable ? <SignUpForm /> : <Loading />;
};

export default SignUp;
