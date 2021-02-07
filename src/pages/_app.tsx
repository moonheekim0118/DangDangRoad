import React from 'react';
import Head from 'next/head';
import Loading from '../components/Loading';
import useRouterStatus from '../hooks/useRouterStatus';
import GlobalStyle from '../globalStyle';

const App = ({ Component }) => {
  const isLoading = useRouterStatus();

  return (
    <>
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
      {isLoading ? <Loading /> : <Component />}
    </>
  );
};

export default App;
