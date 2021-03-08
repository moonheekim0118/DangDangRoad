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
import styled from '@emotion/styled';

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
    <Container>
      <Label htmlFor={id} required={required}>
        {inputContents[id].label}
      </Label>
      <InputField
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
      {error && <Error>{inputContents[id].error}</Error>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
`;

const Label = styled.label<{ required: boolean }>`
  padding: 10px 0;
  font-weight: bold;

  &::after {
    content: ${(props) => (props.required ? "' *'" : "' (optional)'")};
    color: ${(props) => (props.required ? 'red' : '#aeaeae')};
  }
`;

const InputField = styled.input`
  padding: 10px 15px;
  border: 2px solid #f4f4f4;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Error = styled.span`
  padding: 10px 0;
  color: red;
  font-size: 0.9rem;
`;

export default forwardRef(Input);
