import React from 'react';
import Button from '.';
import { action } from '@storybook/addon-actions';

export const defaultButton = (args) => (
  <Button {...args} onClick={action('onClick')} />
);

defaultButton.args = {
  children: 'Contents',
  theme: 'primary',
  size: 'large',
  width: '40%',
};

defaultButton.story = {
  name: 'defaultButton',
};

export default {
  title: 'atoms | Button',
  component: Button,
};
