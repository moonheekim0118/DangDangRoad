import { useRef, useCallback } from 'react';
import { inputRef, defaultRef } from 'types/Input';
/**
 *  used in Signup and Update Password
 */
const usePasswordCheck = () => {
  const passwordRef = useRef<inputRef>(defaultRef);
  const passwordCheckRef = useRef<inputRef>(defaultRef);

  const passwordCheckValidator = useCallback(
    (value: string) => {
      return value === passwordRef.current.value;
    },
    [passwordRef]
  );

  return [passwordRef, passwordCheckRef, passwordCheckValidator] as const;
};

export default usePasswordCheck;
