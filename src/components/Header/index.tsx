import React from 'react';
import Icon from 'atoms/Icon';
import Anchor from 'atoms/Anchor';
import Span from 'atoms/Span';
import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';
import Navigation from 'components/Navigation';
import useToggle from 'hooks/useToggle';
import useSignOut from 'hooks/useSignOut';
import styled from '@emotion/styled';
import { colorCode } from 'types/colorCode';
import { useRouter } from 'next/router';
import { useLoginInfoState } from 'context/LoginInfo';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Header = (): React.ReactElement => {
  const router = useRouter();
  const pathname = router.pathname;
  const signOutHandler = useSignOut();
  const { isLoggedIn } = useLoginInfoState();
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
        <SearchBar color="blue" focus={true} />
      </SearchBarContainer>
      <SideContainer>
        {isLoggedIn ? (
          <>
            <ExtraMenuContainer>
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                margin="0 20px 0 0"
                path="/">
                MYREVIEWS
              </Anchor>
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                margin="0 20px 0 0"
                path="/">
                MYPAGE
              </Anchor>
            </ExtraMenuContainer>
            <Span
              fontsize={1.2}
              color="white"
              hoverColor="light-gray"
              cursor="pointer"
              spanClickHandler={signOutHandler}
              bold={true}>
              LOGOUT
            </Span>
          </>
        ) : (
          <>
            {pathname !== '/login' && (
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                margin="0 20px 0 0"
                path="/login">
                LogIn
              </Anchor>
            )}
            {pathname !== '/signUp' && (
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                path="/signUp">
                SignUp
              </Anchor>
            )}
          </>
        )}
      </SideContainer>
      {openNavigation && (
        <NavigationContainer>
          <SearchBar color="blue" focus={true} />
          {pathname !== '/signUp' && pathname !== '/login' && <Navigation />}
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
