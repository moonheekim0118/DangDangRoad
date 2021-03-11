import { useEffect, useCallback, useRef } from 'react';

interface Props {
  /** depedencies for infinite scroll controll function  */
  deps?: any[];
  /** function to excute on intersect */
  fetcher: () => void;
  /** not on interest*/
  removeFetcher?: () => void;
}

const useIntersectionObserver = ({
  deps = [],
  fetcher,
  removeFetcher,
}: Props) => {
  const observerTarget = useRef(null);

  const onIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      fetcher();
    } else {
      removeFetcher && removeFetcher();
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

export default useIntersectionObserver;
