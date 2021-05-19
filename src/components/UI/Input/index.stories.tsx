import React from 'react';
import { Story } from '@storybook/react';
import { inputId } from 'common/constant/input';
import {
  emailValidator,
  nicknameValidator,
  passwordValidator,
} from 'util/validations';
import Input, { Props } from '.';

const Template: Story<Props> = (args) => <Input {...args} />;

export const EmailInput = Template.bind({});
export const NicknameInput = Template.bind({});
export const PasswordInput = Template.bind({});

EmailInput.args = {
  id: inputId.EMAIL,
  required: true,
  validator: emailValidator,
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
