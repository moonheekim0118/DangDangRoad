import React, { useEffect } from 'react';
import Loading from 'components/Loading';
import { useRouter } from 'next/router';

const withNotAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const Router = useRouter();

    useEffect(() => {
      if (props.authenticated) Router.back();
    }, []);

    if (!props.authenticated) return <WrappedComponent {...props} />;
    return <Loading />;
  };

  return Wrapper;
};

export default withNotAuth;
