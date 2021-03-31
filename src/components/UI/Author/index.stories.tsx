import React from 'react';
import Author, { Props } from '.';
import { css } from '@emotion/react';
import { Story } from '@storybook/react';

const Template: Story<Props> = (args) => (
  <div
    css={css`
      width: 200px;
    `}>
    <Author {...args} />
  </div>
);

export const Medium = Template.bind({});
export const Small = Template.bind({});
export const WithDropDown = Template.bind({});

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

WithDropDown.args = {
  ...Medium.args,
  menuList: [
    {
      title: 'test',
    },
    { title: 'test2' },
  ],
};

export default {
  title: 'Author',
  component: Author,
};
