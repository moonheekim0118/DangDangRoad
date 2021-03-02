import { useEffect, useRef, useCallback } from 'react';

/**
 *  infinite Scroll with Intersection Observer
 *  has Parameter 'fetchData'function, which will be executed
 *  when user is Intersection the target Element
 *  return observerTarget, which will be the ref of the Element that I.O observes
 */

const useInfiniteScroll = (fetchData: () => void) => {
  const observerTarget = useRef(null);

  const onIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    let observer;
    if (observerTarget && observerTarget.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(observerTarget.current);
    }
    return () => observer && observer.disconnect();
  }, [observerTarget]);

  return [observerTarget];
};

export default useInfiniteScroll;
