import { useEffect, useState, useRef } from 'react';

interface Props {
  initialIndex?: number;
  totalSlide: number;
}

const useImageSlide = ({ initialIndex = 0, totalSlide }: Props) => {
  const [index, setIndex] = useState<number>(initialIndex);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${index}00%)`;
    }
  }, [index]);

  const toPrev = () => {
    index === 0 ? setIndex(totalSlide - 1) : setIndex(index - 1);
  };

  const toNext = () => {
    index === totalSlide - 1 ? setIndex(0) : setIndex(index + 1);
  };

  const handleChangeIndex = (index: number) => () => {
    setIndex(index);
  };

  return {
    index,
    slideRef,
    toPrev,
    toNext,
    handleChangeIndex,
    setIndex,
  };
};

export default useImageSlide;
