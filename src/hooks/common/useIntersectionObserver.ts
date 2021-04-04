import { useEffect, useCallback, useRef } from 'react';
import { RefType, defaultRef } from 'types/Ref';

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
  const observerTarget = useRef<HTMLDivElement>(null);
  const didMount = useRef<RefType<boolean>>(defaultRef(false));

  const onIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      fetcher();
      if (didMount.current) didMount.current.value = true;
    } else {
      // only excute removeFetcher right after fetcher excuted
      if (didMount.current && didMount.current.value) {
        removeFetcher && removeFetcher();
        didMount.current.value = false;
      }
    }
  }, deps);

  useEffect(() => {
    let observer = null as IntersectionObserver | null;
    if (observerTarget && observerTarget.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      if (observer) {
        observer.observe(observerTarget.current);
      }
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [observerTarget, ...deps]);

  return observerTarget;
};

export default useIntersectionObserver;
