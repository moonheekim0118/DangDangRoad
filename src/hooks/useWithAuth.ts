import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLoginInfoState } from 'context/LoginInfo';

/**
 * this Hooks will return If it's authenticated or not
 * by renderable state
 */

const useWithAuth = (): boolean => {
  const router = useRouter();
  const [renderable, setRenderable] = useState<boolean>(false);
  const { isLoggedIn, isLoaded } = useLoginInfoState();

  useEffect(() => {
    if (!isLoggedIn && isLoaded) {
      router.push('/login');
    } else if (isLoggedIn && isLoaded) {
      setRenderable(true);
    }
  }, [isLoggedIn, isLoaded]);

  return renderable;
};

export default useWithAuth;
