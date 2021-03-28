import React from 'react';
import DrowDown from '.';

export const dropdown = (args) => <DrowDown {...args} />;

dropdown.story = {
  name: 'dropDown',
};

dropdown.args = {
  menuList: [
    {
      title: 'test',
    },
    { title: 'test2' },
  ],
};

export default {
  title: 'DropDown',
  component: DrowDown,
};
