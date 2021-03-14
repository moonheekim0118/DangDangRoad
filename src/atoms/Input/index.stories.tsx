import React from 'react';
import { inputId } from 'common/constant/input';
import {
  checkEmail,
  nicknameValidator,
  passwordValidator,
  nicknameValidatorForUpdate,
} from 'util/signUpValidations';
import { css } from '@emotion/react';
import Input from '.';

export const input = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}>
    <Input id={inputId.EMAIL} required={true} validator={checkEmail} />
    <Input
      id={inputId.NICKNAME}
      required={true}
      validator={nicknameValidator}
    />
    <Input
      id={inputId.PASSWORD}
      required={true}
      validator={passwordValidator}
    />
    <Input id={inputId.PASSWORDCHECK} required={true} />
    <Input
      id={inputId.NOWPASSWORD}
      required={true}
      validator={nicknameValidatorForUpdate}
    />
    <Input
      id={inputId.NEWPASSWORD}
      required={true}
      validator={passwordValidator}
    />
  </div>
);

input.story = {
  name: 'input',
};

export default {
  title: 'atoms | Input',
  component: Input,
};
