import React from 'react';
import useToggle from '../../hooks/useToggle';
import Header from '../Header';
import Navigation from '../Navigation';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [openNavigation, NavigationToggler] = useToggle();

  return (
    <Container>
      <Header toggleHandler={NavigationToggler} />
      {openNavigation && <Navigation />}
      {children}
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

export default Layout;
