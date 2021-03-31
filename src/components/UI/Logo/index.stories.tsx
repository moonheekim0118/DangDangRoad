import React from 'react';
import { Story } from '@storybook/react';
import Logo, { Props } from '.';

const Template: Story<Props> = (args) => <Logo {...args} />;

export const BlueLogo = Template.bind({});
export const WhiteLogo = Template.bind({});

BlueLogo.args = {
  color: 'blue',
};

WhiteLogo.args = {
  color: 'white',
};

export default {
  title: 'Logo',
  component: Logo,
};
