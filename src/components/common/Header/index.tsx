import React, { useRef, useCallback } from 'react';
import { PlaceSearch } from 'components/common';
import { Icon, Link, Logo, Avatar, DropDown } from 'components/ui';
import { useSignOut, useCloseDropdown } from 'hooks';
import { useLoginInfoState } from 'context/LoginInfo';
import { faList, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  MENU_MYPAGE_TITLE,
  MENU_LOGOUT_TITLE,
  MENU_LOGIN_TITLE,
  MENU_SIGNUP_TITLE,
  MENU_WRITE_REVIEW_TITLE,
  MENU_BOOKMARK_TITLE,
} from 'common/constant/string';
import { useRouter } from 'next/router';
import routes from 'common/constant/routes';
import * as S from './style';

const Header = (): React.ReactElement => {
  const router = useRouter();
  const signOutHandler = useSignOut();
  const navRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isLoggedIn, profilePic } = useLoginInfoState();
  const [detailRef, closeDropDownHanlder] = useCloseDropdown();

  const toggleNavigation = useCallback(
    (e: React.MouseEvent) => {
      if (navRef.current) {
        navRef.current.setAttribute('aria-expended', 'true');
        const element = e.target as Element;
        if (navRef.current.style.display === 'flex') {
          navRef.current.style.display = 'none';
          return element.parentElement?.setAttribute('aria-expended', 'false');
        }
        navRef.current.style.display = 'flex';
        element.parentElement?.setAttribute('aria-expended', 'true');
      }
    },
    [navRef]
  );

  const checkPath = useCallback(
    (pathname: string): boolean => {
      return pathname === router.pathname;
    },
    [router.pathname]
  );

  const SignUpLink = (
    <Link
      align="left"
      size="large"
      width="100%"
      theme="primary"
      href={routes.SIGNUP}>
      {MENU_SIGNUP_TITLE}
    </Link>
  );

  const LoginLink = (
    <Link
      align="left"
      size="large"
      width="100%"
      theme="primary"
      href={routes.LOGIN}>
      {MENU_LOGIN_TITLE}
    </Link>
  );

  const WriteReviewLink = (
    <Link
      align="left"
      size="large"
      width="100%"
      theme="primary"
      href={routes.WRITE_REIVEW}>
      {MENU_WRITE_REVIEW_TITLE}
    </Link>
  );

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
      {isLoaded && (
        <>
          {isLoggedIn ? (
            <S.SideNavigation>
              <S.AuthDetailsContainer ref={detailRef}>
                <S.UserInfoSummary>
                  <Avatar imageUrl={profilePic} size="small" />
                  <Icon icon={faCaretDown} size="medium" />
                </S.UserInfoSummary>
                <S.DetailsMenu>
                  <DropDown
                    menuList={[
                      { title: MENU_MYPAGE_TITLE, href: routes.MYPAGE },
                      { title: MENU_BOOKMARK_TITLE, href: routes.MYPAGE },
                      { title: MENU_LOGOUT_TITLE, onClick: signOutHandler },
                    ]}
                    closeHanlder={closeDropDownHanlder}
                  />
                </S.DetailsMenu>
              </S.AuthDetailsContainer>
              <S.HideInMobile>{WriteReviewLink}</S.HideInMobile>
            </S.SideNavigation>
          ) : (
            <S.SideNavigation>
              {!checkPath(routes.LOGIN) ? (
                !checkPath(routes.SIGNUP) ? (
                  <>
                    {LoginLink}
                    <S.HideInMobile>{SignUpLink}</S.HideInMobile>
                  </>
                ) : (
                  LoginLink
                )
              ) : (
                SignUpLink
              )}
            </S.SideNavigation>
          )}
        </>
      )}
      <S.ToggleContainer>
        <S.NavigationContainer ref={navRef}>
          <PlaceSearch />
          {isLoggedIn && (
            <S.NavigationContents>{WriteReviewLink}</S.NavigationContents>
          )}
          {!isLoggedIn &&
            !checkPath(routes.SIGNUP) &&
            !checkPath(routes.LOGIN) && (
              <S.NavigationContents>{SignUpLink}</S.NavigationContents>
            )}
        </S.NavigationContainer>
      </S.ToggleContainer>
    </S.Container>
  );
};

export default Header;
