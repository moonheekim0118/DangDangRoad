import React from 'react';
import Logo from 'components/ui/Logo';
import SearchBar from 'components/common/SearchBar';
import Navigation from 'components/common/Navigation';
import { useSignOut } from 'hooks/controller';
import { useToggle } from 'hooks/common';
import { Icon, Anchor, Span } from 'atoms';
import { colorCode } from 'common/style/color';
import { useRouter } from 'next/router';
import { useLoginInfoState } from 'context/LoginInfo';
import { faList } from '@fortawesome/free-solid-svg-icons';
import {
  MENU_MYPAGE_TITLE,
  MENU_LOGOUT_TITLE,
  MENU_LOGIN_TITLE,
  MENU_SIGNUP_TITLE,
} from 'common/constant/string';
import routes from 'common/constant/routes';
import styled from '@emotion/styled';

const Header = (): React.ReactElement => {
  const router = useRouter();
  const pathname = router.pathname;
  const signOutHandler = useSignOut();
  const { isLoaded, isLoggedIn } = useLoginInfoState();
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
        {isLoaded && (
          <>
            {isLoggedIn ? (
              <>
                <ExtraMenuContainer>
                  <Anchor
                    fontsize={1.2}
                    color="white"
                    hoverColor="light-gray"
                    margin="0 20px 0 0"
                    path={routes.MYPAGE}>
                    {MENU_MYPAGE_TITLE}
                  </Anchor>
                </ExtraMenuContainer>
                <Span
                  fontsize={1.2}
                  color="white"
                  hoverColor="light-gray"
                  cursor="pointer"
                  spanClickHandler={signOutHandler}
                  bold={true}>
                  {MENU_LOGOUT_TITLE}
                </Span>
              </>
            ) : (
              <>
                {pathname !== routes.LOGIN && (
                  <Anchor
                    fontsize={1.2}
                    color="white"
                    hoverColor="light-gray"
                    margin="0 20px 0 0"
                    path={routes.LOGIN}>
                    {MENU_LOGIN_TITLE}
                  </Anchor>
                )}
                {pathname !== routes.SIGNUP && (
                  <Anchor
                    fontsize={1.2}
                    color="white"
                    hoverColor="light-gray"
                    path={routes.SIGNUP}>
                    {MENU_SIGNUP_TITLE}
                  </Anchor>
                )}
              </>
            )}
          </>
        )}
      </SideContainer>
      {openNavigation && (
        <NavigationContainer>
          <SearchBar color="blue" focus={true} />
          {pathname !== routes.SIGNUP && pathname !== routes.LOGIN && (
            <Navigation isLoggedIn={isLoggedIn} />
          )}
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
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
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
