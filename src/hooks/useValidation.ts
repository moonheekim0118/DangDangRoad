import { useState, useEffect, useCallback } from 'react';

interface Props {
  /** initla value for input value */
  initialValue?: string;
  /** input value's possible max lenght*/
  max: number;
  /** input value's possible min lenght*/
  min: number;
  /** input value's character checker function*/
  characterCheck?: (value: string) => boolean;
}

const useValidation = ({
  initialValue = '',
  max,
  min,
  characterCheck,
}: Props) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setValue(value);
  }, [initialValue]);

  const valueChangeHanlder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = (e.target as HTMLInputElement).value;
      if (
        target.length > max ||
        target.length < min ||
        (characterCheck && !characterCheck(target))
      )
        setError(true);
      else setError(false);
      setValue(target);
    },
    [value]
  );

  return [value, error, valueChangeHanlder] as const;
};

export default useValidation;
