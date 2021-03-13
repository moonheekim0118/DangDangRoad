import React from 'react';
import Avatar from '.';
import { action } from '@storybook/addon-actions';

export const avatar = (args) => <Avatar {...args} />;

avatar.args = {
  size: 'small',
};

avatar.story = {
  name: 'avatar',
};

export default {
  title: 'atoms | Avatar',
  component: Avatar,
};
