import React from 'react';
import CloseBtn, { Props } from '.';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const Template: Story<Props> = (args) => (
  <CloseBtn {...args} onClick={action('onClick')} />
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
  title: 'CloseBtn',
  component: CloseBtn,
};
