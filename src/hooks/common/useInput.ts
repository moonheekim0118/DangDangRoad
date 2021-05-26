import { useState, useEffect } from 'react';

const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = (e.target as HTMLInputElement).value;
    setValue(target);
  };

  return [value, handleChangeValue, setValue] as const;
};

export default useInput;
