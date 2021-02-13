import React, { useEffect } from 'react';
import Loading from 'components/Loading';
import useDetectInitial from 'hooks/useDetectInitial';
import { useRouter } from 'next/router';
import { useLoginInfoState } from 'context/LoginInfo';

const withNotAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const Router = useRouter();
    const isInitial = useDetectInitial();
    const { isLoggedIn } = useLoginInfoState();

    useEffect(() => {
      if (isLoggedIn) Router.back();
    }, [isLoggedIn]);

    // initial rendering 시에도 loading 컴포넌트 대체
    if (!isLoggedIn && !isInitial) return <WrappedComponent {...props} />;
    return <Loading />;
  };

  return Wrapper;
};

export default withNotAuth;
