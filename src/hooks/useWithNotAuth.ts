import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLoginInfoState } from 'context/LoginInfo';

/**
 * this Hooks will return If it's not authenticated or not
 * by renderable state
 */

const useWithNotAuth = (): boolean => {
  const router = useRouter();
  const [renderable, setRenderable] = useState<boolean>(false);
  const { isLoggedIn, isLoaded } = useLoginInfoState();

  useEffect(() => {
    if (!isLoggedIn && isLoaded) setRenderable(true);
    if (isLoggedIn) router.back();
  }, [isLoggedIn, isLoaded]);

  return renderable;
};

export default useWithNotAuth;
