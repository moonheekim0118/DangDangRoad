import React from 'react';
import Button from '.';
import { baseButtonStyle, saveBtnStyle } from 'common/style/baseStyle';
import { action } from '@storybook/addon-actions';

export const defaultButton = (args) => (
  <Button {...args} onClick={action('onClick')} />
);

export const linkButton = (args) => <Button {...args} />;

defaultButton.args = {
  children: 'Contents',
  className: 'btn',
  css: saveBtnStyle,
};
linkButton.args = {
  children: 'Contents',
  className: 'linkBtn',
  linkStyle: baseButtonStyle,
  href: '/',
};

defaultButton.story = {
  name: 'defaultButton',
};

export default {
  title: 'atoms | Button',
  component: Button,
};
