import { useState, useEffect } from 'react';

/**
 *  let you know if it's initial Rendering or not
 */

const useDetectInitial = () => {
  const [init, setInit] = useState<boolean>(true);
  const [isInitial, setIsInitial] = useState<boolean>(true);

  useEffect(() => {
    if (init) {
      setInit(false);
    } else {
      setIsInitial(false);
    }
  }, [init]);

  return isInitial;
};

export default useDetectInitial;
