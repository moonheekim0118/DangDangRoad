import React from 'react';
import { Story } from '@storybook/react';
import Tag, { Props } from '.';

export const Template: Story<Props> = (args) => <Tag {...args} />;

export const Large = Template.bind({});
export const Medium = Template.bind({});
export const Small = Template.bind({});

Large.args = {
  children: 'Contents',
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

Template.args = {
  ...Large.args,
};

export default {
  title: 'Tag',
  component: Tag,
};
