import { useRef } from 'react';
import { InputRef, inputDefaultRef } from 'types/Ref';
/**
 *  used in Signup and Update Password
 */
const usePasswordCheck = () => {
  const passwordRef = useRef<InputRef>(inputDefaultRef());
  const passwordCheckRef = useRef<InputRef>(inputDefaultRef());

  const passwordCheckValidator = (value: string) => {
    return value === passwordRef.current.value;
  };

  return [passwordRef, passwordCheckRef, passwordCheckValidator] as const;
};

export default usePasswordCheck;
