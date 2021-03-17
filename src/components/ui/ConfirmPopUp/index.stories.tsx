import React from 'react';
import ConfirmPopUp, { Props } from '.';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
export const Template: Story<Props> = (args) => <ConfirmPopUp {...args} />;

Template.args = {
  contents: 'this is confirm',
  closeHandler: action('onClick'),
  submitHandler: action('onClick'),
};

export default {
  title: 'ConfirmPopUp',
  component: ConfirmPopUp,
};
