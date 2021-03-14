import React from 'react';
import Button from '.';
import { action } from '@storybook/addon-actions';

export const button = (args) => (
  <Button {...args} onClick={action('onClick')} />
);

button.args = {
  children: 'Contents',
  theme: 'primary',
  size: 'large',
  width: '40%',
};

button.story = {
  name: 'button',
};

export default {
  title: 'atoms | Button',
  component: Button,
};
