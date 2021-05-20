import { useCallback, useState } from 'react';

const useHandleImage = (initialImages: string[]) => {
  const [imageUrl, setImageUrl] = useState<string[]>(initialImages);

  const handleUrlChange = useCallback((urls: string[]) => {
    setImageUrl(urls);
  }, []);

  const handleImageRemove = useCallback(
    (index: number) => () => {
      const filtered = imageUrl.filter((_, i) => i !== index);
      setImageUrl(filtered);
    },
    [imageUrl]
  );

  return [imageUrl, handleUrlChange, handleImageRemove] as const;
};

export default useHandleImage;
