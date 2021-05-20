import { useEffect, useRef, useCallback } from 'react';

const useCloseDropdown = () => {
  const detailRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const overalyCloseHanlder = (e) => {
      const targetElement = e.target as Node;
      const detailElements = detailRef.current;

      if (detailElements && !detailElements.contains(targetElement)) {
        handleCloseDropdown();
      }
    };
    document.addEventListener('mousedown', overalyCloseHanlder);
    return () => document.removeEventListener('mousedown', overalyCloseHanlder);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    detailRef.current && detailRef.current.removeAttribute('open');
  }, []);

  return [detailRef, handleCloseDropdown] as const;
};

export default useCloseDropdown;
