import React from 'react';
import Head from 'next/head';
import GlobalStyle from 'common/style/globalStyle';
import fetcher from 'libs/fetcher';
import { Layout } from 'components/Common';
import { useScroll } from 'hooks';
import { SWRConfig } from 'swr';
import { NotificationProvider } from 'context/Notification';
import { LoginInfoProvider } from 'context/LoginInfo';

const App = ({ Component, pageProps }) => {
  useScroll();
  return (
    <SWRConfig
      value={{
        fetcher,
      }}>
      <LoginInfoProvider>
        <NotificationProvider>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
              rel="stylesheet"></link>

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta charSet="utf-8" />
            <title>댕댕로드</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="description"
              content="댕댕로드는 반려견 산책로 후기를 공유합니다."
            />
            <meta
              property="og:title"
              content="강아지 산책로 후기"
              key="ogtitle"
            />
            <meta
              property="og:description"
              content="댕댕로드는 반려견 산책로 후기를 공유합니다."
              key="ogdesc"
            />
            <meta property="og:image" content="/favicon.ico" key="ogimage" />
            <meta property="og:site_name" content="댕댕로드" key="ogsitename" />
            <meta property="og:type" content="website" key="ogtype" />
            <meta name="twitter:card" content="summary" key="twcard" />
          </Head>
          <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
          </Layout>
        </NotificationProvider>
      </LoginInfoProvider>
    </SWRConfig>
  );
};

export default App;
