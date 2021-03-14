import React from 'react';
import { Story } from '@storybook/react';
import Link, { Props } from '.';

export const Template: Story<Props> = (args) => <Link {...args} />;

export const PrimaryLeft = Template.bind({});
export const PrimaryRight = Template.bind({});
export const PrimaryCenter = Template.bind({});
export const SecondaryLeft = Template.bind({});
export const SecondaryRight = Template.bind({});
export const SecondaryCenter = Template.bind({});

PrimaryLeft.args = {
  children: 'Contents',
  href: '/',
  theme: 'primary',
  size: 'large',
  align: 'left',
  width: '40%',
};

PrimaryCenter.args = {
  ...PrimaryLeft.args,
  align: 'center',
};

PrimaryRight.args = {
  ...PrimaryLeft.args,
  align: 'right',
};

SecondaryLeft.args = {
  ...PrimaryLeft.args,
  theme: 'secondary',
};

SecondaryRight.args = {
  ...PrimaryRight.args,
  theme: 'secondary',
};

SecondaryCenter.args = {
  ...PrimaryCenter.args,
  theme: 'secondary',
};

Template.args = {
  ...PrimaryLeft.args,
};

export default {
  title: 'Link',
  component: Link,
};
