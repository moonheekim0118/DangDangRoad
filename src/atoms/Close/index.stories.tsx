import React from 'react';
import Close, { Props } from '.';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const Template: Story<Props> = (args) => (
  <Close {...args} onClick={action('onClick')} />
);

export const Large = Template.bind({});
export const Medium = Template.bind({});
export const Small = Template.bind({});

Large.args = {
  size: 'large',
};

Medium.args = {
  size: 'medium',
};

Small.args = {
  size: 'small',
};

export default {
  title: 'Close',
  component: Close,
};
