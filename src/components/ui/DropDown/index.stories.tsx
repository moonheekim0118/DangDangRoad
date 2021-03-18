import React from 'react';
import DrowDown from '.';

export const dropdown = (args) => <DrowDown {...args} />;

dropdown.story = {
  name: 'dropDown',
};

export default {
  title: 'DropDown',
  component: DrowDown,
};
