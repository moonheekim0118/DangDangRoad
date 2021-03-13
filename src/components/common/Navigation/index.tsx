import React from 'react';
import routes from 'common/constant/routes';
import { navLinkStyle } from 'common/style/baseStyle';
import { MENU_MYPAGE_TITLE, MENU_SIGNUP_TITLE } from 'common/constant/string';
import { Link } from 'atoms';
import * as S from './style';

interface Props {
  isLoggedIn: boolean;
}
const Navigation = ({ isLoggedIn }: Props): React.ReactElement => {
  return (
    <S.Container>
      {isLoggedIn ? (
        <S.Item>
          <Link style={navLinkStyle} size="large" href={routes.MYPAGE}>
            {MENU_MYPAGE_TITLE}
          </Link>
        </S.Item>
      ) : (
        <S.Item>
          <Link style={navLinkStyle} size="large" href={routes.SIGNUP}>
            {MENU_SIGNUP_TITLE}
          </Link>
        </S.Item>
      )}
    </S.Container>
  );
};

export default Navigation;
