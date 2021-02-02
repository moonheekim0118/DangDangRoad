import { useState, useCallback } from 'react';

const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);

  const valueChangeHanlder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = (e.target as HTMLInputElement).value;
      setValue(target);
    },
    [value]
  );

  return [value, valueChangeHanlder, setValue] as const;
};

export default useInput;
