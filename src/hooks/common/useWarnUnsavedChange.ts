import { useEffect } from 'react';
import { PAGE_LEAVE_WARNING } from 'common/constant/string';
import { useRouter } from 'next/router';

let leaveConfirmed = false;

const useWarnUsavedChange = () => {
  const router = useRouter();

  useEffect(() => {
    leaveConfirmed = false;
  }, []);

  // pop up when try to leave page inner app
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      if (leaveConfirmed) return; // go
      if (window.confirm(PAGE_LEAVE_WARNING)) {
        // leave
        leaveConfirmed = true;
      } else {
        // not leave
        window.history.replaceState(null, '', router.asPath);
        router.events.emit('routeChangeError');
        throw 'routeChange aborted';
      }
    });
  }, []);

  // pop up wanrning when closing Tab and refreshing page
  useEffect(() => {
    const handleWindowClose = (e) => {
      e.preventDefault();
      return (e.returnValue = PAGE_LEAVE_WARNING);
    };
    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);
};

export default useWarnUsavedChange;
