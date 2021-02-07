import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useDetectInitial from '../hooks/useDetectIntial';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';

const withNotAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const Router = useRouter();
    const isInitial = useDetectInitial();
    const isLoggedIn = useAuth();

    useEffect(() => {
      if (isLoggedIn) Router.back();
    }, [isLoggedIn]);

    if (!isLoggedIn && !isInitial) return <WrappedComponent {...props} />;
    return <Loading />;
  };
  return Wrapper;
};

export default withNotAuth;
