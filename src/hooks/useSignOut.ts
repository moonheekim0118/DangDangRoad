import { useEffect, useCallback } from 'react';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/useApiFetch';
import { signOut } from 'api/sign';
import { useLoginInfoDispatch } from 'context/LoginInfo';
import Router from 'next/router';

/** sign out logic  */
const useSignOut = () => {
  const dispatch = useLoginInfoDispatch();
  const [fetchResult, fetchDispatch] = useApiFetch(signOut);

  useEffect(() => {
    if (fetchResult.type === SUCCESS) {
      dispatch({ type: 'logout' });
      Router.push('/');
    }
  }, [fetchResult]);

  // sign out handler
  const signOutHandler = useCallback(() => {
    fetchDispatch({ type: REQUEST });
  }, []);

  return signOutHandler;
};

export default useSignOut;
