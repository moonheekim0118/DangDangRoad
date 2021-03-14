import React from 'react';
import routes from 'common/constant/routes';
import { navLinkStyle } from 'common/style/baseStyle';
import { MENU_ABOUT_TITLE } from 'common/constant/string';
import { Link } from 'atoms';
import Container from './style';

const Navigation = (): React.ReactElement => {
  return (
    <Container>
      <Link align="left" style={navLinkStyle} size="large" href={routes.MYPAGE}>
        {MENU_ABOUT_TITLE}
      </Link>
    </Container>
  );
};

export default Navigation;
