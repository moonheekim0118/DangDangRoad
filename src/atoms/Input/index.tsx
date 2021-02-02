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

const Container = styled.div``;

const Label = styled.label``;

const InputField = styled.input``;

const Error = styled.span``;
export default memo(Input);
