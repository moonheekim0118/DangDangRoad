import React from 'react';
import { Story } from '@storybook/react';
import SearchBar, { Props } from '.';

const Template: Story<Props> = (args) => <SearchBar {...args} />;

export const focusBlueToWhite = Template.bind({});
export const focusWhiteToBlue = Template.bind({});
export const NofocusBlue = Template.bind({});
export const NofocusWhite = Template.bind({});

focusBlueToWhite.args = {
  color: 'blue',
  focusTheme: 'fromBlueToWhite',
};

focusWhiteToBlue.args = {
  color: 'white',
  focusTheme: 'fromWhiteToBlue',
};

NofocusBlue.args = {
  color: 'blue',
};

NofocusWhite.args = {
  color: 'white',
};

export default {
  title: 'SearchBar',
  component: SearchBar,
};
