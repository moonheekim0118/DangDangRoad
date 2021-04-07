import { useEffect, useRef } from 'react';
import { PAGE_LEAVE_WARNING } from 'common/constant/string';
import { useRouter } from 'next/router';

const useWarnUsavedChange = (exception?: string) => {
  const router = useRouter();
  const leaveConfirm = useRef<boolean>(false);

  useEffect(() => {
    leaveConfirm.current = false;
  }, []);

  // pop up when try to leave page inner app
  useEffect(() => {
    const hanlder = (route: string) => {
      if (exception && route.includes(exception)) return;
      if (leaveConfirm.current) return; // go
      if (window.confirm(PAGE_LEAVE_WARNING)) {
        // leave
        leaveConfirm.current = true;
      } else {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      }
    };
    router.events.on('routeChangeStart', hanlder);
    return () => router.events.off('routeChangeStart', hanlder);
  }, []);

  // pop up wanrning when closing Tab and refreshing page
  useEffect(() => {
    const handleWindowClose = (e) => {
      e.preventDefault();
      return (e.returnValue = PAGE_LEAVE_WARNING);
    };
    window.addEventListener('beforeunload', handleWindowClose);

    return () => window.removeEventListener('beforeunload', handleWindowClose);
  }, []);
};

export default useWarnUsavedChange;
