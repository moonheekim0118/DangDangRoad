import React from 'react';
import Link from '.';

export const link = (args) => <Link {...args} />;

link.args = {
  children: 'Contents',
  href: '/',
  theme: 'secondary',
  size: 'large',
  align: 'center',
  width: '40%',
};

link.story = {
  name: 'link',
};

export default {
  title: 'atoms | Link',
  component: Link,
};
