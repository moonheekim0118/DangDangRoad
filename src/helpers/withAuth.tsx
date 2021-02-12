import React, { useEffect } from 'react';
import Loading from 'components/Loading';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!props.authenticatd) router.push('/');
    }, []);

    if (props.authenticated) return <WrappedComponent {...props} />;
    return <Loading />;
  };
  return Wrapper;
};

export default withAuth;
