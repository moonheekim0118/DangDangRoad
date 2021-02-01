import { useState, useCallback } from 'react';

const useToggle = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleHandler = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return [open, toggleHandler] as const;
};

export default useToggle;
