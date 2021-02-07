import { useState, useRef, useEffect } from 'react';

/**
 *  let you know if it's initial Rendering or not
 */

const useDetectInitial = () => {
  const init = useRef<string>('');
  const [isInitial, setIsInitial] = useState<boolean>(true);

  useEffect(() => {
    if (init.current === '') {
      init.current = 'rendered';
    } else {
      setIsInitial(false);
    }
  }, [init]);

  return isInitial;
};

export default useDetectInitial;
