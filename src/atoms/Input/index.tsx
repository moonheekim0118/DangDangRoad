import React, {
  useRef,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
} from 'react';
import { useValidation } from 'hooks';
import { inputId, inputContents } from 'common/constant/input';
import { InputRef } from 'types/Ref';
import * as S from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** input id */
  id: inputId;
  /** check if Input filed is required */
  required?: boolean;
  /** initValue */
  initValue?: string;
  /** validator */
  validator?: (value: string) => boolean;
}

const Input = (props: Props, ref: React.Ref<InputRef>): React.ReactElement => {
  const { id, required = false, initValue, validator, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, error, valueChangeHanlder, checkValidation] = useValidation({
    initialValue: initValue,
    validator,
  });

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
        onChange={valueChangeHanlder}
        onFocus={checkValidation}
        {...rest}
      />
      {error && <S.Error>{inputContents[id].error}</S.Error>}
    </S.Container>
  );
};

export default forwardRef(Input);
