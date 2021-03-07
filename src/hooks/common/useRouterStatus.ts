import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 *  let you know if next routing status
 *  by isLoading
 */

const useRouterStatus = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };

    const complete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', complete);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', complete);
    };
  }, []);

  return isLoading;
};

export default useRouterStatus;
