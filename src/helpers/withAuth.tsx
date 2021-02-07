import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useDetectInitial from '../hooks/useDetectIntial';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const isLoggedIn = useAuth();
    const isInitial = useDetectInitial();

    useEffect(() => {
      if (!isLoggedIn) router.push('/');
    }, [isLoggedIn]);

    if (isLoggedIn && !isInitial) return <WrappedComponent {...props} />;
    return <Loading />;
  };
  return Wrapper;
};

export default withAuth;
