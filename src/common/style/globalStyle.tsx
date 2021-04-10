import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          font-family: 'Nanum Gothic', sans-serif;
          margin: 0;
          padding: 0;
          position: relative;
        }

        html,
        body,
        #__next {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        body {
          --colors-white: #fff;
          --colors-blue: #0277bc;
          --colors-light-blue: #58a5f0;
          --colors-light-gray: #e0e0e0;
          --colors-dark-gray: #aeaeae;
          --colors-deep-gray: #696969;
          --colors-light-red: #fc655d;
          --colors-red: #ff0000;
          --colors-green: #33cc33;
          --font-special: 'Do Hyeon', sans-serif;
        }
      `}
    />
  );
};

export default GlobalStyle;
