import React from 'react';
import Card, { Props } from '.';
import { Story } from '@storybook/react';

const Template: Story<Props> = (args) => <Card {...args} />;

export const Modal = Template.bind({});
export const NotModal = Template.bind({});

Modal.args = {
  isModal: true,
  isLoading: true,
  children: <div>This is Card</div>,
};

NotModal.args = {
  isModal: false,
  isLoading: true,
  children: <div>This is Card</div>,
};

export default {
  title: 'Card',
  component: Card,
};
