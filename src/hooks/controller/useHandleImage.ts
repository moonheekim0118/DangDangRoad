import { useCallback, useState } from 'react';

const useHandleImage = (initialImages: string[]) => {
  const [imageUrl, setImageUrl] = useState<string[]>(initialImages);

  const handleImageRemove = useCallback(
    (index: number) => () => {
      const filtered = imageUrl.filter((_, i) => i !== index);
      setImageUrl(filtered);
    },
    [imageUrl]
  );

  return [imageUrl, setImageUrl, handleImageRemove] as const;
};

export default useHandleImage;
