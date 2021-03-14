import React from 'react';
import Close from '.';
import { action } from '@storybook/addon-actions';

export const close = (args) => <Close {...args} onClick={action('onClick')} />;

close.args = {
  size: 'large',
};

close.story = {
  name: 'tag',
};

export default {
  title: 'atoms | Close',
  component: Close,
};
