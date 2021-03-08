import React from 'react';
import routes from 'common/constant/routes';
import { navLinkStyle } from 'common/style/baseStyle';
import { MENU_MYPAGE_TITLE, MENU_SIGNUP_TITLE } from 'common/constant/string';
import { Button } from 'atoms';
import * as S from './style';

interface Props {
  isLoggedIn: boolean;
}
const Navigation = ({ isLoggedIn }: Props): React.ReactElement => {
  return (
    <S.Container>
      {isLoggedIn ? (
        <S.Item>
          <Button linkStyle={navLinkStyle} href={routes.MYPAGE}>
            {MENU_MYPAGE_TITLE}
          </Button>
        </S.Item>
      ) : (
        <S.Item>
          <Button linkStyle={navLinkStyle} href={routes.SIGNUP}>
            {MENU_SIGNUP_TITLE}
          </Button>
        </S.Item>
      )}
    </S.Container>
  );
};

export default Navigation;
