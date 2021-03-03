import React from 'react';
import { inputId, inputContents } from 'common/constant/input';
import styled from '@emotion/styled';

interface Props {
  /** input field type */
  type: 'text' | 'password';
  /** input id */
  id: inputId;
  /** input filed value */
  value: string;
  /** error message & show or not */
  error?: boolean;
  /** check if Input filed is required */
  required?: boolean;
  /** input filed change handler func */
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  id,
  value,
  error,
  required = false,
  inputChangeHandler,
}: Props): React.ReactElement => {
  return (
    <Container>
      <Label htmlFor={id} required={required}>
        {inputContents[id].label}
      </Label>
      <InputField
        type={type}
        id={id}
        value={value}
        placeholder={inputContents[id].placeholder}
        onChange={inputChangeHandler}
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
