import React from 'react';
import Link from '.';

export const defaultLink = (args) => <Link {...args} />;

defaultLink.args = {
  children: 'Contents',
  href: '/',
  size: 'large',
  width: '40%',
};

defaultLink.story = {
  name: 'defaultLink',
};

export default {
  title: 'atoms | Link',
  component: Link,
};
