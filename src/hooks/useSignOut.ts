import { useCallback } from 'react';
import { signOut } from 'api/sign';
import { useLoginInfoDispatch } from 'context/LoginInfo';
import Router from 'next/router';

/** sign out logic  */
const useSignOut = () => {
  const dispatch = useLoginInfoDispatch();
  const signOutHandler = useCallback(async () => {
    const response = await signOut();
    if (!response.isError) {
      dispatch({ type: 'logout' }); // login 상태 해지
    }
    Router.push('/');
  }, []);

  return signOutHandler;
};

export default useSignOut;
