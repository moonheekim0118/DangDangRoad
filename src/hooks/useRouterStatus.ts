import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 *  let you know if next routing status
 *  by isLoading
 */

const useRouterStatus = () => {
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };

    const complete = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', complete);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', complete);
    };
  }, []);

  return isLoading;
};

export default useRouterStatus;
