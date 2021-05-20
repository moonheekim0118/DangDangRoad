import { useState, useCallback } from 'react';

interface Props {
  /** initla value for input value */
  initialValue?: string;
  /** input value's character checker function*/
  validator?: (value: string) => boolean;
}

const useValidation = ({ initialValue = '', validator }: Props = {}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<boolean>(false);

  const handleChangeValue = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const target = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
      setValue(target);
      if (validator) {
        !validator(target) ? setError(true) : setError(false);
      }
    },
    [value]
  );

  const checkValidation = useCallback(() => {
    if (validator) {
      !validator(value) ? setError(true) : setError(false);
    }
  }, [value]);

  return {
    value,
    error,
    handleChangeValue,
    checkValidation,
    setError,
    setValue,
  };
};

export default useValidation;
