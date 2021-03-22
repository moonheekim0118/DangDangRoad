import { useState, useRef, useEffect } from 'react';

const useLazyLoadImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer;
    if (imageRef) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(imageRef.current);
          }
        },
        { threshold: [0.5] }
      );
      observer.observe(imageRef.current);
    }
    return () => observer && observer.disconnect(imageRef);
  }, []);

  return [imageSrc, imageRef] as const;
};

export default useLazyLoadImage;
