import React from 'react';
import { Story } from '@storybook/react';
import Toast, { Props } from '.';

const Template: Story<Props> = (args) => <Toast {...args} />;

export const Success = Template.bind({});
export const Info = Template.bind({});
export const Fail = Template.bind({});

Success.args = {
  children: 'Contents',
  size: 'large',
  theme: 'success',
  show: true,
  animation: true,
};

Info.args = {
  ...Success.args,
  theme: 'info',
};

Fail.args = {
  ...Success.args,
  theme: 'fail',
};

export default {
  title: 'Toast',
  component: Toast,
};
