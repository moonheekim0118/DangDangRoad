import React from 'react';
import useToggle from '../../hooks/useToggle';
import Header from '../Header';
import Navigation from '../Navigation';
import styled from '@emotion/styled';

const Layout = () => {
  const [openNavigation, NavigationToggler] = useToggle();

  return (
    <Container>
      <Header toggleHandler={NavigationToggler} />
      {openNavigation && <Navigation />}
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
