import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const useWithAuth = (isLoggedIn: boolean) => {
  const router = useRouter();
  const isInitial = useRef<boolean>(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);
};

export default useWithAuth;
