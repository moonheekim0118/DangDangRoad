import React from 'react';
import Header from 'components/Header';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <Container>
      <Header />
      <MainContents>{children}</MainContents>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContents = styled.main`
  width: 100%;
  height: 100%;
  margin: auto;

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

export default Layout;
