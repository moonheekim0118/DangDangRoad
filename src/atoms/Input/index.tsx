import React from 'react';
import { inputId } from 'model/inputIds';
import styled from '@emotion/styled';

const inputContents = {
  [inputId.EMAIL]: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요!',
    error: '올바른 이메일을 입력해주세요.',
  },
  [inputId.NICKNAME]: {
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요!',
    error: '2자~10자 영문, 한글 ,숫자를 사용하세요. ',
  },
  [inputId.PASSWORD]: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요!',
    error: '6~16자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요.',
  },
  [inputId.PASSWORDCHECK]: {
    label: '비밀번호 확인',
    placeholder: '비밀번호를 확인해주세요!',
    error: '비밀번호가 일치하지 않습니다.',
  },
};

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
}: Props) => {
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
