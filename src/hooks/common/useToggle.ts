import { useEffect, useState, useCallback } from 'react';

const useToggle = (initialValue: boolean | undefined = false) => {
  const [status, setStatus] = useState<boolean>(initialValue);

  useEffect(() => {
    setStatus(initialValue);
  }, []);

  const handleToggle = useCallback(() => {
    setStatus(!status);
  }, [status]);

  return [status, handleToggle, setStatus] as const;
};

export default useToggle;
