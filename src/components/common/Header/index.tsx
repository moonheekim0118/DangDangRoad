import React, { useRef, useCallback } from 'react';
import { PlaceSearch } from 'components/common';
import { Icon, Link, Button, Logo } from 'components/ui';
import { useSignOut } from 'hooks';
import { useLoginInfoState } from 'context/LoginInfo';
import { faList } from '@fortawesome/free-solid-svg-icons';
import {
  MENU_MYPAGE_TITLE,
  MENU_LOGOUT_TITLE,
  MENU_LOGIN_TITLE,
  MENU_SIGNUP_TITLE,
  MENU_ABOUT_TITLE,
} from 'common/constant/string';
import { useRouter } from 'next/router';
import routes from 'common/constant/routes';
import * as S from './style';

const Header = (): React.ReactElement => {
  const router = useRouter();
  const signOutHandler = useSignOut();
  const navRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isLoggedIn } = useLoginInfoState();

  const toggleNavigation = useCallback(() => {
    if (navRef.current) {
      navRef.current.style.display === 'flex'
        ? (navRef.current.style.display = 'none')
        : (navRef.current.style.display = 'flex');
    }
  }, [navRef]);

  const checkPath = (pathname) => pathname === router.pathname;

  const navs = {
    authenticated: (
      <>
        <Link
          align="left"
          width="100%"
          theme="primary"
          size="large"
          href={routes.MYPAGE}>
          {MENU_ABOUT_TITLE}
        </Link>
        <Link
          align="left"
          size="large"
          width="100%"
          theme="primary"
          href={routes.MYPAGE}>
          {MENU_MYPAGE_TITLE}
        </Link>
        <Button
          theme="special"
          size="medium"
          width="100%"
          className="logOutBtn"
          onClick={signOutHandler}>
          {MENU_LOGOUT_TITLE}
        </Button>
      </>
    ),
    notAuthenticated: (
      <>
        <Link
          align="left"
          width="100%"
          theme="primary"
          size="large"
          href={routes.MYPAGE}>
          {MENU_ABOUT_TITLE}
        </Link>
        {!checkPath(routes.LOGIN) && (
          <Link
            align="left"
            size="large"
            width="100%"
            theme="primary"
            href={routes.LOGIN}>
            {MENU_LOGIN_TITLE}
          </Link>
        )}
        {!checkPath(routes.SIGNUP) && (
          <Link
            align="left"
            size="large"
            width="100%"
            theme="primary"
            href={routes.SIGNUP}>
            {MENU_SIGNUP_TITLE}
          </Link>
        )}
      </>
    ),
  };

  return (
    <S.Container>
      <S.MenuToggler>
        <Icon
          icon={faList}
          size="large"
          style={S.iconStyle}
          onClick={toggleNavigation}
        />
      </S.MenuToggler>
      <S.LogoContainer>
        <Logo color="white" />
      </S.LogoContainer>
      <S.SearchBarContainer>
        <PlaceSearch />
      </S.SearchBarContainer>
      <S.SideContainer></S.SideContainer>
      {isLoaded && (
        <S.SideContainer>
          {isLoggedIn ? navs.authenticated : navs.notAuthenticated}
        </S.SideContainer>
      )}
      <S.ToggleContainer>
        <S.NavigationContainer ref={navRef}>
          <PlaceSearch />
          <S.NavigationContents>
            {isLoggedIn ? navs.authenticated : navs.notAuthenticated}
          </S.NavigationContents>
        </S.NavigationContainer>
      </S.ToggleContainer>
    </S.Container>
  );
};

export default Header;
