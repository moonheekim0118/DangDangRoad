import React from 'react';
import { Story } from '@storybook/react';
import { inputId } from 'common/constant/input';
import {
  checkEmail,
  nicknameValidator,
  passwordValidator,
} from 'util/signUpValidations';
import Input, { Props } from '.';

export const Template: Story<Props> = (args) => <Input {...args} />;

export const EmailInput = Template.bind({});
export const NicknameInput = Template.bind({});
export const PasswordInput = Template.bind({});

EmailInput.args = {
  id: inputId.EMAIL,
  required: true,
  validator: checkEmail,
};

NicknameInput.args = {
  ...EmailInput.args,
  id: inputId.NICKNAME,
  validator: nicknameValidator,
};

PasswordInput.args = {
  ...EmailInput.args,
  id: inputId.PASSWORD,
  validator: passwordValidator,
};

Template.args = {
  ...EmailInput.args,
};

export default {
  title: 'Input',
  component: Input,
};
