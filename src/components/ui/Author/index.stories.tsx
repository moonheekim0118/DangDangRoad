import React from 'react';
import Author, { Props } from '.';
import { Story } from '@storybook/react';

const Template: Story<Props> = (args) => <Author {...args} />;

export const Medium = Template.bind({});
export const Small = Template.bind({});

Medium.args = {
  userData: {
    nickname: 'User',
    profilePic: '',
  },
  size: 'medium',
};

Small.args = {
  ...Medium.args,
  size: 'small',
};

export default {
  title: 'Author',
  component: Author,
};
