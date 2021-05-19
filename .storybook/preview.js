import React from 'react';
import { addDecorator } from '@storybook/react';
import { makeDecorator } from '@storybook/addons';
import GlobalStyle from 'common/style/globalStyle';
import { MainContents } from 'components/Common/Layout/style';

const withGlobal = makeDecorator({
  name: 'withGlobalStyle',
  parameterName: '',
  wrapper: (getStory, context) => {
    return (
      <MainContents>
        <GlobalStyle />

        {getStory(context)}
      </MainContents>
    );
  },
});

addDecorator(withGlobal);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
