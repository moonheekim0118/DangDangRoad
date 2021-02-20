import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import Notification from 'components/Notification';
import GlobalStyle from 'globalStyle';
import fetcher from 'libs/fetcher';
import { useRouterStatus } from 'hooks';
import { SWRConfig } from 'swr';
import { NotificationProvider } from 'context/Notification';
import { LoginInfoProvider } from 'context/LoginInfo';

const App = ({ Component, pageProps }) => {
  const isLoading = useRouterStatus();

  return (
    <SWRConfig
      value={{
        fetcher,
      }}>
      <LoginInfoProvider>
        <NotificationProvider>
          <Layout>
            <Head>
              <link
                href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
                rel="stylesheet"></link>
              <meta charSet="utf-8" />
              <title>댕댕로드</title>
            </Head>
            <GlobalStyle />
            <Notification />
            {isLoading ? <Loading /> : <Component {...pageProps} />}
          </Layout>
        </NotificationProvider>
      </LoginInfoProvider>
    </SWRConfig>
  );
};

export default App;
