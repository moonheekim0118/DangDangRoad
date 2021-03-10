import { useState, useCallback } from 'react';

const useSessionStorage = <T>(key: string, initialValue = '') => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, []);

  return [storedValue, setValue] as const;
};

export default useSessionStorage;
