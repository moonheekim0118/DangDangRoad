import React, { InputHTMLAttributes } from 'react';
import { inputId, inputContents } from 'common/constant/input';
import styled from '@emotion/styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** input id */
  id: inputId;
  /** error message & show or not */
  error?: boolean;
  /** check if Input filed is required */
  required?: boolean;
  /** input filed change handler func */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: Props): React.ReactElement => {
  const { id, required = false, onChange, error, ...rest } = props;
  return (
    <Container>
      <Label htmlFor={id} required={required}>
        {inputContents[id].label}
      </Label>
      <InputField
        id={id}
        placeholder={inputContents[id].placeholder}
        onChange={onChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
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

export default Input;
