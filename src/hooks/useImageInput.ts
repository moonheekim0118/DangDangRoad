import { useRef, useCallback } from 'react';

const useImageInput = () => {
  const imageInput = useRef<HTMLInputElement>(null);

  const uploaderClickHanlder = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  return [imageInput, uploaderClickHanlder] as const;
};

export default useImageInput;
