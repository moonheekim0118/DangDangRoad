import React from 'react';
import Header from '../Header';
import styled from '@emotion/styled';

const Layout = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f0;
`;

export default Layout;
