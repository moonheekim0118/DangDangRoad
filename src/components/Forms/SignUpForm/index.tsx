import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import useMatch from '../../../hooks/useMatch';
import useValidation from '../../../hooks/useValidation';
import styled from '@emotion/styled';
import * as CHECKER from '../../../utils/inputValidation';

// TODO 특수문자 에러 띄워주기
// 강아지 닉네임 추가  ( 반려견의 이름을 입력해주세요! )
const inputContents = {
  id: {
    placeholder: '아이디를 입력해주세요!',
    error: '5~20자 영문자 소문자, 숫자와 특수기호(_)(-)만 사용 가능합니다.',
  },
  nickname: {
    placeholder: '닉네임을 입력해주세요!',
    error: '3~15자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요',
  },
  password: {
    placeholder: '비밀번호를 입력해주세요!',
    error: '6~16자 영문 대 소문자, 한글, 숫자, 특수문자를 사용하세요',
  },
  passwordCheck: {
    placeholder: '비밀번호를 확인해주세요!',
    error: '비밀번호가 일치하지 않습니다.',
  },
};

const SignUpForm = () => {
  /** id */
  const [id, idError, IdChangeHandler] = useValidation({
    initialValue: '',
    max: 10,
    min: 5,
    characterCheck: CHECKER.passIdValue,
  });
  /** nickname */
  const [nickname, nicknameError, NicknameChangeHandler] = useValidation({
    initialValue: '',
    max: 15,
    min: 3,
    characterCheck: CHECKER.passNicknameValue,
  });
  /** password */
  const [password, passwordError, PasswordChangeHandler] = useValidation({
    initialValue: '',
    max: 16,
    min: 6,
  });
  /** password check */
  const [
    passwordCheck,
    passwordCheckError,
    PasswordCheckChangeHandler,
  ] = useValidation({ initialValue: '', max: 16, min: 6 });

  const passwordMatch = useMatch({ value: passwordCheck, target: password });

  return (
    <Form>
      <Input
        type="text"
        label="아이디"
        placeholder={inputContents['id'].placeholder}
        value={id}
        error={{ message: inputContents['id'].error, show: idError }}
        required={true}
        inputChangeHandler={IdChangeHandler}
      />
      <Input
        type="text"
        label="닉네임"
        placeholder={inputContents['nickname'].placeholder}
        value={nickname}
        error={{
          message: inputContents['nickname'].error,
          show: nicknameError,
        }}
        required={true}
        inputChangeHandler={NicknameChangeHandler}
      />
      <Input
        type="password"
        label="비밀번호"
        placeholder={inputContents['password'].placeholder}
        value={password}
        error={{
          message: inputContents['password'].error,
          show: passwordError,
        }}
        required={true}
        inputChangeHandler={PasswordChangeHandler}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder={inputContents['passwordCheck'].placeholder}
        value={passwordCheck}
        error={{
          message: inputContents['passwordCheck'].error,
          show: !passwordMatch,
        }}
        required={true}
        inputChangeHandler={PasswordCheckChangeHandler}
      />
      <Button color="blue"> JOIN</Button>
    </Form>
  );
};

const Form = styled.form`
  width: 450px;
  height: 600px;
  padding: 15px 25px;
  border-radius: 10px;
  background-color: #fff;
`;

export default SignUpForm;
