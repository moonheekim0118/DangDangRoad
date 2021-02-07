import { useCallback } from 'react';
import { signOut } from '../remotes/sign';

const useSignOut = () => {
  const signOutHandler = useCallback(async () => {
    await signOut();
  }, []);

  return signOutHandler;
};

export default useSignOut;
