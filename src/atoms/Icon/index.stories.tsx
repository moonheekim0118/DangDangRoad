import React from 'react';
import Icon, { Props } from '.';
import { Story } from '@storybook/react';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { action } from '@storybook/addon-actions';

export const Template: Story<Props> = (args) => (
  <Icon {...args} onClick={action('onClick')} />
);

export const Large = Template.bind({});
export const Medium = Template.bind({});
export const Small = Template.bind({});

Large.args = {
  icon: faBeer,
  size: 'large',
};

Medium.args = {
  ...Large.args,
  size: 'medium',
};

Small.args = {
  ...Large.args,
  size: 'small',
};

export default {
  title: 'Icon',
  component: Icon,
};
