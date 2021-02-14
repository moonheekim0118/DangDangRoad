import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useWithAuth = (isLoggedIn: boolean) => {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.back();
  }, [isLoggedIn]);
};

export default useWithAuth;
