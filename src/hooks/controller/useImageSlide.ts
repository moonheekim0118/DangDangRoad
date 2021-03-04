import { useEffect, useCallback, useState, useRef } from 'react';

interface Props {
  initialIndex?: number;
  totalSlide: number;
}

const useImageSlide = ({ initialIndex = 0, totalSlide }: Props) => {
  const [index, setIndex] = useState<number>(initialIndex);
  const slideRef = useRef<any>(null);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${index}00%)`;
    }
  }, [index]);

  const toPrev = useCallback(() => {
    if (index === 0) {
      setIndex(totalSlide - 1);
    } else {
      setIndex(index - 1);
    }
  }, [index]);

  const toNext = useCallback(() => {
    if (index === totalSlide - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, [index]);

  const changeIndexHandler = useCallback(
    (index: number) => () => {
      setIndex(index);
    },
    []
  );

  return {
    index,
    slideRef,
    toPrev,
    toNext,
    changeIndexHandler,
  };
};

export default useImageSlide;
