import React from 'react';
import Icon from '.';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { action } from '@storybook/addon-actions';

export const icon = (args) => <Icon {...args} onClick={action('onClick')} />;

icon.args = {
  icon: faBeer,
  size: 'large',
};

icon.story = {
  name: 'icon',
};

export default {
  title: 'atoms | Icon',
  component: Icon,
};
