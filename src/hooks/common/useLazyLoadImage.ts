import { useState, useRef, useEffect } from 'react';

const useLazyLoadImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer = null as IntersectionObserver | null;
    if (imageRef && imageRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && observer && imageRef.current) {
            setImageSrc(src);
            observer.unobserve(imageRef.current);
          }
        },
        { threshold: [0.8] }
      );
      if (observer) observer.observe(imageRef.current);
    }
    return () => {
      if (observer && imageRef) observer.disconnect();
    };
  }, []);

  return [imageSrc, imageRef] as const;
};

export default useLazyLoadImage;
