import { useEffect } from 'react';
import { useLoginInfoDispatch } from 'context/LoginInfo';
/**
 *  change isLoggedIn state in Context
 *  by parameter authenticated
 */

const useLoginCheck = (authenticated: boolean) => {
  const dispatch = useLoginInfoDispatch();
  useEffect(() => {
    if (authenticated) {
      dispatch({ type: 'login' });
    }
  }, []);
};

export default useLoginCheck;
