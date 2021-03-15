import React from 'react';
import { Story } from '@storybook/react';
import {
  RADIO_TITLE_PARKING_LOT,
  RADIO_TITLE_OFFLEASH,
  RADIO_TITLE_RECOMMENDATION,
  RADIO_LIST,
} from 'common/constant/string';
import RadioBox, { Props } from '.';

const Template: Story<Props> = (args) => <RadioBox {...args} />;

export const HasParkingLot = Template.bind({});
export const HasOffLeash = Template.bind({});
export const Recommendation = Template.bind({});

HasParkingLot.args = {
  title: RADIO_TITLE_PARKING_LOT,
  list: RADIO_LIST.has,
};

HasOffLeash.args = {
  title: RADIO_TITLE_OFFLEASH,
  list: RADIO_LIST.available,
};

Recommendation.args = {
  title: RADIO_TITLE_RECOMMENDATION,
  list: RADIO_LIST.recomendation,
};

export default {
  title: 'RadioBox',
  component: RadioBox,
};
