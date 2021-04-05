import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import debounce from 'util/debounce';
import cacheProto from 'util/cache';

/** to store Scroll Y's position */
const CACHE = new cacheProto<number>();

const useScroll = () => {
  const router = useRouter();
  const [pathname, setPathName] = useState<string>(router.pathname + 'scroll');

  /** add Scroll position to cache*/
  useEffect(() => {
    const main = document.getElementById('__next');
    if (main) {
      const scrollHandler = debounce({
        // debounce
        cb: () => CACHE.set(router.pathname, main.scrollTop, 1),
        delay: 100,
      });

      if (pathname !== router.pathname + 'scroll') {
        const scrollY = CACHE.get(router.pathname + 'scroll');
        if (scrollY) {
          main.scrollTo(0, scrollY);
        } else {
          main.scrollTo(0, 0);
        }
      }

      main.addEventListener('scroll', scrollHandler);
      setPathName(router.pathname + 'scroll');
      return () => {
        main.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [router.pathname]);
};

export default useScroll;
