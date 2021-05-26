import { useEffect, useState } from 'react';

const useToggle = (initialValue: boolean | undefined = false) => {
  const [status, setStatus] = useState<boolean>(initialValue);

  useEffect(() => {
    setStatus(initialValue);
  }, []);

  const handleToggle = () => {
    setStatus(!status);
  };

  return [status, handleToggle, setStatus] as const;
};

export default useToggle;
