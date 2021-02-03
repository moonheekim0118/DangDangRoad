import React from 'react';
import Header from '../Header';
import Navigation from '../Navigation';
import styled from '@emotion/styled';

const Layout = () => {
  return (
    <Container>
      <Header />
      <Navigation />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f0;
  display: flex;
  flex-direction: column;
`;

export default Layout;
