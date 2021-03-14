import React from 'react';
import GlobalStyle from 'common/style/globalStyle';
import { addDecorator } from '@storybook/react';
import { makeDecorator } from '@storybook/addons';
import { NotificationProvider } from 'context/Notification';
import { LoginInfoProvider } from 'context/LoginInfo';

const withGlobal = makeDecorator({
  name: 'withGlobalStyle',
  parameterName: '',
  wrapper: (getStory, context) => {
    return (
      <LoginInfoProvider>
        <NotificationProvider>
          <GlobalStyle />
          {getStory(context)}
        </NotificationProvider>
      </LoginInfoProvider>
    );
  },
});

addDecorator(withGlobal);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
