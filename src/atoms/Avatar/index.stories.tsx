import React from 'react';
import { Story } from '@storybook/react';
import Avatar, { Props } from '.';

export const Template: Story<Props> = (args) => <Avatar {...args} />;

export const Small = Template.bind({});
export const medium = Template.bind({});
export const large = Template.bind({});

Small.args = {
  size: 'small',
};

medium.args = {
  size: 'medium',
};

large.args = {
  size: 'large',
};

export default {
  title: 'Avatar',
  component: Avatar,
};
