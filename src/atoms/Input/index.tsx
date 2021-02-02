import React, { memo } from 'react';
import styled from '@emotion/styled';

interface Props {
  /** input field type */
  type: 'text' | 'password';
  /** label title */
  label: string;
  /** placeholder contents */
  placeholder?: string;
  /** input filed value */
  value: string;
  /** error message & show or not */
  error?: {
    message: string;
    show: boolean;
  };
  /** input filed change handler func */
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, error, inputChangeHandler }: Props) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputField placeholder={placeholder} onChange={inputChangeHandler} />
      {error && error.show && <Error>{error.message}</Error>}
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

const Label = styled.label`
  padding: 10px 0;
  font-weight: bold;
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

export default memo(Input);
