import React from 'react';
import Logo from 'components/ui/Logo';
import Navigation from 'components/common/Navigation';
import PlaceSearch from 'components/common/PlaceSearch';
import { navLinkStyle } from 'common/style/baseStyle';
import { useSignOut, useToggle } from 'hooks';
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
  const { isLoaded, isLoggedIn } = useLoginInfoState();
  const [openNavigation, NavigationToggler] = useToggle();

  return (
    <S.Container>
      <S.MenuToggler>
        <Icon
          icon={faList}
          size="large"
          style={S.iconStyle}
          onClick={NavigationToggler}
        />
      </S.MenuToggler>
      <S.LogoContainer>
        <Logo color="white" />
      </S.LogoContainer>
      <S.SearchBarContainer>
        <PlaceSearch />
      </S.SearchBarContainer>
      <S.SideContainer>
        {isLoaded && (
          <>
            {isLoggedIn ? (
              <>
                <S.ExtraMenuContainer>
                  <Link
                    align="center"
                    size="large"
                    width="100%"
                    style={navLinkStyle}
                    href={routes.MYPAGE}>
                    {MENU_MYPAGE_TITLE}
                  </Link>
                </S.ExtraMenuContainer>
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
                  <S.ExtraMenuContainer>
                    <Link
                      align="center"
                      size="large"
                      width="100%"
                      style={navLinkStyle}
                      href={routes.SIGNUP}>
                      {MENU_SIGNUP_TITLE}
                    </Link>
                  </S.ExtraMenuContainer>
                )}
              </>
            )}
          </>
        )}
      </S.SideContainer>
      {openNavigation && (
        <S.NavigationContainer>
          <PlaceSearch />
          {pathname !== routes.SIGNUP && pathname !== routes.LOGIN && (
            <Navigation isLoggedIn={isLoggedIn} />
          )}
        </S.NavigationContainer>
      )}
    </S.Container>
  );
};

export default Header;
