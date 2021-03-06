import { useEffect, useCallback, useRef } from 'react';

interface Props {
  /** depedencies for infinite scroll controll function  */
  deps?: any[];
  /** function to excute on intersect */
  fetcher: () => void;
}

const useInfiniteScroll = ({ deps = [], fetcher }: Props) => {
  const observerTarget = useRef(null);

  const onIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      fetcher();
    }
  }, deps);

  useEffect(() => {
    let observer;
    if (observerTarget && observerTarget.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(observerTarget.current);
    }
    return () => observer && observer.disconnect();
  }, [observerTarget, ...deps]);

  return observerTarget;
};

export default useInfiniteScroll;
