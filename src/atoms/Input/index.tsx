import React, { memo } from 'react';
import { inputId } from '../../model/inputIds';
import styled from '@emotion/styled';

const inputContents = {
  [inputId.ID]: {
    label: '아이디',
    placeholder: '아이디를 입력해주세요!',
    error: '5~20자 영문자 소문자, 숫자와 특수기호(_)(-)만 사용 가능합니다.',
  },
  [inputId.NICKANME]: {
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요!',
    error: '3~15자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요',
  },
  [inputId.PASSWORD]: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요!',
    error: '6~16자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요',
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
    content: ${(props) => (props.required ? "' *'" : "''")};
    color: red;
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

export default memo(Input);
