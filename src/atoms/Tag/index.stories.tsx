import React from 'react';
import Tag from '.';

export const tag = (args) => <Tag {...args} />;

tag.args = {
  children: 'Contents',
  size: 'large',
};

tag.story = {
  name: 'tag',
};

export default {
  title: 'atoms | Tag',
  component: Tag,
};
