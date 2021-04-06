import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import debounce from 'util/debounce';
import cacheProto from 'util/cache';

/** to store Scroll Y's position */
const CACHE = new cacheProto<number>();
let POPSTATE_STATUS = false;

const useScroll = () => {
  const router = useRouter();
  const [prevPath, setPrevPath] = useState<string>(router.asPath);
  const didPopState = useRef<boolean>(false);

  /** add Scroll position to cache*/
  useEffect(() => {
    const main = document.getElementById('__next');
    const currentPage = router.asPath;

    if (main) {
      const scrollHandler = debounce({
        cb: () => {
          if (didPopState.current) {
            return (didPopState.current = false);
          }
          CACHE.set(currentPage, main.scrollTop, 1);
        },
        delay: 100,
      });

      if (prevPath !== currentPage) {
        const scrollY = CACHE.get(currentPage);
        if (scrollY && POPSTATE_STATUS) {
          main.scrollTo(0, scrollY);
        } else {
          main.scrollTo(0, 0);
        }
      }

      const popStateHandler = () => {
        POPSTATE_STATUS = true;
        didPopState.current = true;
        return true;
      };

      main.addEventListener('scroll', scrollHandler);
      router.beforePopState(popStateHandler);
      setPrevPath(router.asPath);

      return () => {
        main.removeEventListener('scroll', scrollHandler);
        if (!didPopState.current) {
          POPSTATE_STATUS = false;
        }
      };
    }
  }, [router.asPath]);
};

export default useScroll;
