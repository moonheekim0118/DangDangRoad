import React from 'react';
import Head from 'next/head';
import GlobalStyle from '../globalStyle';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <title>댕댕로드</title>
      </Head>
      <GlobalStyle />
      <Component />
    </>
  );
};

export default App;
