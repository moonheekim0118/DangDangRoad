import { useCallback } from 'react';
import { useLoginInfoDispatch } from 'context/LoginInfo';
import api from 'api';
import Router from 'next/router';

/** sign out logic  */
const useSignOut = () => {
  const dispatch = useLoginInfoDispatch();

  // sign out handler
  const signOutHandler = useCallback(async () => {
    const response = await api.signOut();
    if (!response.isError) {
      dispatch({ type: 'logout' }); // login 상태 해지
    }
    Router.push('/');
  }, []);

  return signOutHandler;
};

export default useSignOut;
