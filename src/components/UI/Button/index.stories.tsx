import React from 'react';
import Button, { Props } from '.';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const Template: Story<Props> = (args) => (
  <Button {...args} onClick={action('onClick')} />
);

export const Primary = Template.bind({});
export const Info = Template.bind({});
export const Danger = Template.bind({});
export const OutlinedPrimary = Template.bind({});
export const OutlinedInfo = Template.bind({});
export const OutlinedDanger = Template.bind({});
export const Special = Template.bind({});

Primary.args = {
  children: 'Contents',
  theme: 'primary',
  size: 'large',
  width: '200px',
};

Info.args = {
  ...Primary.args,
  theme: 'info',
};

Danger.args = {
  ...Primary.args,
  theme: 'danger',
};

OutlinedPrimary.args = {
  ...Primary.args,
  theme: 'outlinedPrimary',
};

OutlinedInfo.args = {
  ...Primary.args,
  theme: 'outlinedInfo',
};

OutlinedDanger.args = {
  ...Primary.args,
  theme: 'outlinedDanger',
};

Special.args = {
  ...Primary.args,
  theme: 'special',
};

export default {
  title: 'Button',
  component: Button,
};
