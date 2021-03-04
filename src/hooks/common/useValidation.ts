import { useState, useCallback } from 'react';

interface Props {
  /** initla value for input value */
  initialValue?: string;
  /** input value's character checker function*/
  characterCheck?: (value: string) => boolean;
}

const useValidation = ({ initialValue = '', characterCheck }: Props = {}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<boolean>(false);

  const valueChangeHanlder = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const target = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
      if (characterCheck && !characterCheck(target)) setError(true);
      else setError(false);
      setValue(target);
    },
    [value]
  );

  return { value, error, valueChangeHanlder, setError, setValue };
};

export default useValidation;
