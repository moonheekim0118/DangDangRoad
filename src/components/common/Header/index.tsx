import React, { useRef, useCallback } from 'react';
import Logo from 'components/ui/Logo';
import Navigation from 'components/common/Navigation';
import PlaceSearch from 'components/common/PlaceSearch';
import { navLinkStyle } from 'common/style/baseStyle';
import { useSignOut } from 'hooks';
import { Icon, Link, Button } from 'atoms';
import { useLoginInfoState } from 'context/LoginInfo';
import { faList } from '@fortawesome/free-solid-svg-icons';
import {
  MENU_MYPAGE_TITLE,
  MENU_LOGOUT_TITLE,
  MENU_LOGIN_TITLE,
  MENU_SIGNUP_TITLE,
} from 'common/constant/string';
import { useRouter } from 'next/router';
import routes from 'common/constant/routes';
import * as S from './style';

const Header = (): React.ReactElement => {
  const router = useRouter();
  const pathname = router.pathname;
  const signOutHandler = useSignOut();
  const navRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isLoggedIn } = useLoginInfoState();

  const toggleNavigation = useCallback(() => {
    if (navRef.current) {
      console.log(navRef.current.style.display);
      navRef.current.style.display === 'none'
        ? (navRef.current.style.display = 'block')
        : (navRef.current.style.display = 'none');
    }
  }, [navRef]);

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
          {isLoggedIn ? (
            <>
              <Link
                align="center"
                size="large"
                width="100%"
                style={navLinkStyle}
                href={routes.MYPAGE}>
                {MENU_MYPAGE_TITLE}
              </Link>
              <Button
                theme="default"
                size="large"
                width="100%"
                className="logOutBtn"
                css={navLinkStyle}
                onClick={signOutHandler}>
                {MENU_LOGOUT_TITLE}
              </Button>
            </>
          ) : (
            <>
              {pathname !== routes.LOGIN && (
                <Link
                  align="center"
                  size="large"
                  width="100%"
                  style={navLinkStyle}
                  href={routes.LOGIN}>
                  {MENU_LOGIN_TITLE}
                </Link>
              )}
              {pathname !== routes.SIGNUP && (
                <Link
                  align="center"
                  size="large"
                  width="100%"
                  style={navLinkStyle}
                  href={routes.SIGNUP}>
                  {MENU_SIGNUP_TITLE}
                </Link>
              )}
            </>
          )}
        </S.SideContainer>
      )}
      <S.NavigationContainer ref={navRef}>
        <PlaceSearch />
        <Navigation />
      </S.NavigationContainer>
    </S.Container>
  );
};

export default Header;
