import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          font-family: 'Nanum Gothic', sans-serif;
          color: black;
        }
      `}
    />
  );
};

export default GlobalStyle;
