import { useCallback } from 'react';

interface Props {
  cb: () => void;
  delay: number;
}

const useDebounce = () => {
  const inDebounce = useCallback(({ cb, delay }: Props) => {
    let timer: number | null = null;
    return function () {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(() => cb(), delay);
    };
  }, []);

  return inDebounce;
};

export default useDebounce;
