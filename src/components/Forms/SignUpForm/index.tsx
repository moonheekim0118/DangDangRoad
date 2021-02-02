import React from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import useMatch from '../../../hooks/useMatch';
import useValidation from '../../../hooks/useValidation';
import styled from '@emotion/styled';
import { inputId } from '../../../model/inputIds';
import * as CHECKER from '../../../utils/inputValidation';

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
  const [passwordCheck, , PasswordCheckChangeHandler] = useValidation({
    initialValue: '',
    max: 16,
    min: 6,
  });

  const passwordMatch = useMatch({ value: passwordCheck, target: password });

  return (
    <Form>
      <Input
        type="text"
        id={inputId.ID}
        value={id}
        error={idError}
        required={true}
        inputChangeHandler={IdChangeHandler}
      />
      <Input
        type="text"
        id={inputId.NICKANME}
        value={nickname}
        error={nicknameError}
        required={true}
        inputChangeHandler={NicknameChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORD}
        value={password}
        error={passwordError}
        required={true}
        inputChangeHandler={PasswordChangeHandler}
      />
      <Input
        type="password"
        id={inputId.PASSWORDCHECK}
        value={passwordCheck}
        error={!passwordMatch}
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
