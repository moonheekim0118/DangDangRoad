import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <Container>
      <Header />
      <MainContents>{children}</MainContents>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #fff;
`;

const MainContents = styled.main`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: #fbfbfb;
`;

export default Layout;
