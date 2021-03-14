import React from 'react';
import Title from '.';

export const title = (args) => <Title {...args} />;

title.args = {
  children: 'title contents',
};

title.story = {
  name: 'title',
};

export default {
  title: 'atoms | Title',
  component: Title,
};
