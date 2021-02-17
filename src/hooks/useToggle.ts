import { useEffect, useState, useCallback } from 'react';

const useToggle = (initialValue: boolean | undefined = false) => {
  const [status, setStatus] = useState<boolean>(initialValue);

  useEffect(() => {
    setStatus(initialValue);
  }, []);

  const toggleHandler = useCallback(() => {
    setStatus(!status);
  }, [status]);

  return [status, toggleHandler, setStatus] as const;
};

export default useToggle;
