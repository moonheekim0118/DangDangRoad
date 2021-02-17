import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import GlobalStyle from 'globalStyle';
import fetcher from 'libs/fetcher';
import { useRouterStatus } from 'hooks';
import { SWRConfig } from 'swr';
import { LoginInfoProvider } from 'context/LoginInfo';

const App = ({ Component, pageProps }) => {
  const isLoading = useRouterStatus();

  return (
    <SWRConfig
      value={{
        fetcher,
      }}>
      <LoginInfoProvider>
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
          {isLoading ? <Loading /> : <Component {...pageProps} />}
        </Layout>
      </LoginInfoProvider>
    </SWRConfig>
  );
};

export default App;
