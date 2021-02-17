import React from 'react';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import Alert from 'atoms/Alert';
import useSignUp from 'hooks/useSignUp';
import { inputId } from 'types/Input';
import * as S from '../style';

const SignUpForm = (): React.ReactElement => {
  const data = useSignUp();
  return (
    <S.Form signUp={true}>
      <S.Title>SIGN UP</S.Title>
      {data.alertMessage !== '' && (
        <Alert type="error" closeAlertHandler={data.closeAlertHandler}>
          {data.alertMessage}
        </Alert>
      )}
      <Input
        type="text"
        id={inputId.EMAIL}
        value={data.email}
        error={data.emailError}
        required={true}
        inputChangeHandler={data.EmailChangeHandler}
      />
      <Input
        type="text"
        id={inputId.NICKNAME}
        value={data.nickname}
        error={data.nicknameError}
        required={true}
        inputChangeHandler={data.NicknameChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={data.password}
        error={data.passwordError}
        required={true}
        inputChangeHandler={data.PasswordChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORDCHECK}
        value={data.passwordCheck}
        error={!data.passwordMatch}
        required={true}
        inputChangeHandler={data.PasswordCheckChangeHandler}
      />
      <S.ButtonContainer>
        <Button
          color="blue"
          hoverColor="light-blue"
          type="submit"
          onClick={data.SubmitHanlder}>
          JOIN
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default SignUpForm;
