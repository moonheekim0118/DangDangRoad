import { useRef } from 'react';
import { PlaceSearch } from 'components/Common';
import { Icon, Logo } from 'components/UI';
import { useSignOut } from 'hooks';
import { useLoginInfoState } from 'context/LoginInfo';
import { faList, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  MENU_MYPAGE_TITLE,
  MENU_LOGOUT_TITLE,
  MENU_BOOKMARK_TITLE,
} from 'common/constant/string';
import { SignUpLink, WriteReviewLink, LoginLink } from './navigations';
import { useRouter } from 'next/router';
import routes from 'common/constant/routes';
import dynamic from 'next/dynamic';
import * as S from './style';

const DetailsDropdown = dynamic(() => import('components/UI/DetailsDropdown'));
const Avatar = dynamic(() => import('components/UI/Avatar'));

const Header = (): React.ReactElement => {
  const router = useRouter();
  const handleSignOut = useSignOut();
  const navRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isLoggedIn, profilePic } = useLoginInfoState();

  const handleNavigation = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    navRef.current.style.display === 'flex'
      ? (navRef.current.style.display = 'none')
      : (navRef.current.style.display = 'flex');
  };

  const checkPath = (pathname: string): boolean => pathname === router.pathname;

  return (
    <S.Container>
      <S.MenuToggler>
        <Icon
          icon={faList}
          size="large"
          style={S.iconStyle}
          onClick={handleNavigation}
        />
      </S.MenuToggler>
      <S.MainContainer>
        <Logo color="white" />
        {isLoaded && (
          <>
            {isLoggedIn ? (
              <S.SideNavigation>
                <DetailsDropdown
                  theme="secondary"
                  menuList={[
                    {
                      title: MENU_MYPAGE_TITLE,
                      href: routes.MYPAGE_UPDATE_PROFILE,
                    },
                    {
                      title: MENU_BOOKMARK_TITLE,
                      href: routes.MYPAGE_BOOKMARK,
                    },
                    { title: MENU_LOGOUT_TITLE, onClick: handleSignOut },
                  ]}>
                  <S.UserInfoSummary>
                    <Avatar imageUrl={profilePic} size="small" />
                    <Icon icon={faCaretDown} size="medium" />
                  </S.UserInfoSummary>
                </DetailsDropdown>
                <S.HideInMobile>
                  <WriteReviewLink />
                </S.HideInMobile>
              </S.SideNavigation>
            ) : (
              <S.SideNavigation>
                {!checkPath(routes.LOGIN) ? (
                  !checkPath(routes.SIGNUP) ? (
                    <>
                      <LoginLink />
                      <S.HideInMobile>
                        <SignUpLink />
                      </S.HideInMobile>
                    </>
                  ) : (
                    <LoginLink />
                  )
                ) : (
                  <SignUpLink />
                )}
              </S.SideNavigation>
            )}
          </>
        )}
      </S.MainContainer>
      <S.Navigation ref={navRef}>
        <PlaceSearch />
        {isLoggedIn && (
          <S.NavigationContents>
            <WriteReviewLink />
          </S.NavigationContents>
        )}
        {!isLoggedIn && !checkPath(routes.SIGNUP) && !checkPath(routes.LOGIN) && (
          <S.NavigationContents>
            <SignUpLink />
          </S.NavigationContents>
        )}
      </S.Navigation>
    </S.Container>
  );
};

export default Header;
