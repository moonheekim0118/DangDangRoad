import { useCallback } from 'react';
import { signOut } from 'api/sign';
import { useLoginInfoDispatch } from 'context/LoginInfo';

/** sign out logic  */
const useSignOut = () => {
  const dispatch = useLoginInfoDispatch();
  const signOutHandler = useCallback(async () => {
    const response = await signOut();
    if (!response.isError) {
      dispatch({ type: 'logout' }); // login 상태 해지
    }
  }, []);

  return signOutHandler;
};

export default useSignOut;
