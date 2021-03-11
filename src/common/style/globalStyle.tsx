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
      `}
    />
  );
};

export default GlobalStyle;
