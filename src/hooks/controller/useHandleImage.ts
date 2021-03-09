import { useCallback, useState } from 'react';

const useHandleImage = (initialImages: string[]) => {
  const [imageUrl, setImageUrl] = useState<string[]>(initialImages);

  const imageUrlChangeHandler = useCallback((urls: string[]) => {
    setImageUrl(urls);
  }, []);

  const imageRemoveHanlder = useCallback(
    (index: number) => () => {
      const filtered = imageUrl.filter((_, i) => i !== index);
      setImageUrl(filtered);
    },
    [imageUrl]
  );

  return [imageUrl, imageUrlChangeHandler, imageRemoveHanlder] as const;
};

export default useHandleImage;
