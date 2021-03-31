import React from 'react';
import { Story } from '@storybook/react';
import SearchBar, { Props } from '.';

const Template: Story<Props> = (args) => <SearchBar {...args} />;

export const focusBlueToWhite = Template.bind({});
export const focusWhiteToBlue = Template.bind({});
export const NofocusBlue = Template.bind({});
export const NofocusWhite = Template.bind({});

focusBlueToWhite.args = {
  id: 'blueFocusSearch',
  color: 'blue',
  focusTheme: 'fromBlueToWhite',
};

focusWhiteToBlue.args = {
  id: 'whiteFocusSearch',
  color: 'white',
  focusTheme: 'fromWhiteToBlue',
};

NofocusBlue.args = {
  id: 'blueSearch',
  color: 'blue',
};

NofocusWhite.args = {
  id: 'whiteSearch',
  color: 'white',
};

export default {
  title: 'SearchBar',
  component: SearchBar,
};
