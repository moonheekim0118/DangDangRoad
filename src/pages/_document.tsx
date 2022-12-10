import Document, { Html, Head, Main, NextScript } from 'next/document';

declare global {
  interface Window {
    kakao: any;
  }
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko=KR">
        <Head>
          <script
            type="text/javascript"
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e336dd1e762e649f21d156b39987df95&libraries=services,clusterer,drawing"></script>
        </Head>
        <body>
          <div id="modal-root" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
