import { useEffect } from 'react';
import { PAGE_LEAVE_WARNING } from 'common/constant/string';
import { useRouter } from 'next/router';

let leaveConfirmed = false;

const useWarnUsavedChange = (exception?: string) => {
  const router = useRouter();

  useEffect(() => {
    leaveConfirmed = false;
  }, []);

  // pop up when try to leave page inner app
  useEffect(() => {
    const hanlder = (route: string) => {
      if (exception && route.includes(exception)) return;
      if (leaveConfirmed) return; // go
      if (window.confirm(PAGE_LEAVE_WARNING)) {
        // leave
        leaveConfirmed = true;
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
