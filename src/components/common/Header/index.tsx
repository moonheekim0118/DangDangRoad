import React from 'react';
import Logo from 'components/ui/Logo';
import Navigation from 'components/common/Navigation';
import PlaceSearch from 'components/common/PlaceSearch';
import { navLinkStyle, navLinkStyleWithMargin } from 'common/style/baseStyle';
import { useSignOut, useToggle } from 'hooks';
import { Icon, Button } from 'atoms';
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
          className="menuIcon"
          css={S.iconStyle}
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
                  <Button
                    linkStyle={navLinkStyleWithMargin}
                    href={routes.MYPAGE}>
                    {MENU_MYPAGE_TITLE}
                  </Button>
                </S.ExtraMenuContainer>
                <span css={navLinkStyle} onClick={signOutHandler}>
                  {MENU_LOGOUT_TITLE}
                </span>
              </>
            ) : (
              <>
                {pathname !== routes.LOGIN && (
                  <Button
                    linkStyle={navLinkStyleWithMargin}
                    href={routes.LOGIN}>
                    {MENU_LOGIN_TITLE}
                  </Button>
                )}
                {pathname !== routes.SIGNUP && (
                  <S.ExtraMenuContainer>
                    <Button linkStyle={navLinkStyle} href={routes.SIGNUP}>
                      {MENU_SIGNUP_TITLE}
                    </Button>
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
