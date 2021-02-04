import React from 'react';
import Logo from '../Logo';
import Icon from '../../atoms/Icon';
import Anchor from '../../atoms/Anchor';
import Span from '../../atoms/Span';
import SearchBar from '../SearchBar';
import Navigation from '../Navigation';
import styled from '@emotion/styled';
import useToggle from '../../hooks/useToggle';
import { useRouter } from 'next/router';
import { colorCode } from '../../model/colorCode';
import { faList } from '@fortawesome/free-solid-svg-icons';

const isLoggedIn = false;

const Header = () => {
  const router = useRouter();
  const [openNavigation, NavigationToggler] = useToggle();

  return (
    <Container>
      <MenuToggler>
        <Icon
          iconsize={20}
          icon={faList}
          color="white"
          cursor="pointer"
          iconClickHandler={NavigationToggler}
        />
      </MenuToggler>
      <LogoContainer>
        <Logo color="white" />
      </LogoContainer>
      <SearchBarContainer>
        <SearchBar color="blue" />
      </SearchBarContainer>
      <SideContainer>
        {isLoggedIn ? (
          <>
            <ExtraMenuContainer>
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                title="MyReviews"
                margin="0 20px 0 0"
                path="/"
              />
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                title="MyPage"
                margin="0 20px 0 0"
                path="/"
              />
            </ExtraMenuContainer>
            <Span
              fontsize={1.2}
              color="white"
              title="LOGOUT"
              hoverColor="light-gray"
              cursor="pointer"
              bold={true}
            />
          </>
        ) : (
          <>
            <Span
              fontsize={1.2}
              color="white"
              title="LogIn"
              hoverColor="light-gray"
              margin="0 20px 0 0"
              cursor="pointer"
              bold={true}
            />
            {router.pathname !== '/signUp' && (
              <ExtraMenuContainer>
                <Anchor
                  fontsize={1.2}
                  color="white"
                  hoverColor="light-gray"
                  title="SignUp"
                  path="/"
                />
              </ExtraMenuContainer>
            )}
          </>
        )}
      </SideContainer>
      {openNavigation && (
        <NavigationContainer>
          <SearchBar color="blue" />
          {router.pathname !== '/signUp' && <Navigation />}
        </NavigationContainer>
      )}
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px 30px;
  lign-height: 1.5;

  background-color: ${colorCode['blue']};
  z-index: 4000;

  @media only screen and (max-width: 400px) {
    padding: 0 10px;
  }
`;

const SideContainer = styled.div`
  display: flex;
`;

const MenuToggler = styled.div`
  opacity: 0;
  margin-right: 25px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 910px) {
    opacity: 1;
  }
`;

const LogoContainer = styled.div`
  align-self: center;
  flex: auto;
`;

const SearchBarContainer = styled.div`
  width: 30%;
  position: absolute;
  left: 250px;
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

const ExtraMenuContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @media only screen and (min-width: 910px) {
    display: none;
  }
`;
export default Header;
