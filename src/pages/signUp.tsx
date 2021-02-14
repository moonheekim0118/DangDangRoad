import React from 'react';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import SignUpForm from 'components/Forms/SignUpForm';
import useWithNotAuth from 'hooks/useWithNotAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const SignUp = (): React.ReactElement => {
  useLoginCheck();
  const { isLoggedIn, isLoaded } = useLoginInfoState();
  useWithNotAuth(isLoggedIn);

  if (!isLoggedIn && isLoaded) return <SignUpForm />;
  return <Loading />;
};

export default SignUp;
