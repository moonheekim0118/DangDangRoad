import React, { useEffect } from 'react';
import Loading from 'components/Loading';
import useDetectInitial from 'hooks/useDetectInitial';
import { useRouter } from 'next/router';
import { useLoginInfoState } from 'context/LoginInfo';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isInitial = useDetectInitial();
    const { isLoggedIn } = useLoginInfoState();

    useEffect(() => {
      if (!isLoggedIn) router.push('/login');
    }, [isLoggedIn]);

    if (isLoggedIn && !isInitial) return <WrappedComponent {...props} />;
    return <Loading />;
  };
  return Wrapper;
};

export default withAuth;
