import React from 'react';
import { Story } from '@storybook/react';
import Loading, { Props } from '.';

const Template: Story<Props> = (args) => <Loading {...args} />;

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
  title: 'Loading',
  component: Loading,
};
