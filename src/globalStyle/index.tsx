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
      `}
    />
  );
};

export default GlobalStyle;
