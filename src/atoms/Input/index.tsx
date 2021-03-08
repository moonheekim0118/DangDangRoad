import React, {
  useState,
  useCallback,
  useRef,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
} from 'react';
import { inputId, inputContents } from 'common/constant/input';
import { inputRef } from 'types/Input';
import * as S from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** input id */
  id: inputId;
  /** check if Input filed is required */
  required?: boolean;
  /** validator */
  validator?: (value: string) => boolean;
}

const Input = (props: Props, ref: React.Ref<inputRef>): React.ReactElement => {
  const { id, required = false, validator, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      value,
      error,
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    [value, error]
  );

  // onChange for Value
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = (e.target as HTMLInputElement).value;
    setValue(target);
    if (validator) {
      !validator(target) ? setError(true) : setError(false);
    }
  }, []);

  // check Validation if there is validator
  const checkValidation = useCallback(() => {
    if (validator) {
      !validator(value) ? setError(true) : setError(false);
    }
  }, [value]);

  return (
    <S.Container>
      <S.Label htmlFor={id} required={required}>
        {inputContents[id].label}
      </S.Label>
      <S.InputField
        id={id}
        ref={inputRef}
        placeholder={inputContents[id].placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={value}
        onChange={onChange}
        onFocus={checkValidation}
        {...rest}
      />
      {error && <S.Error>{inputContents[id].error}</S.Error>}
    </S.Container>
  );
};

export default forwardRef(Input);
