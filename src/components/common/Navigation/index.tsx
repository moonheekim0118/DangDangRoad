import React from 'react';
import routes from 'common/constant/routes';
import { MENU_ABOUT_TITLE } from 'common/constant/string';
import { Link } from 'atoms';
import Container from './style';

const Navigation = (): React.ReactElement => {
  return (
    <Container>
      <Link
        align="left"
        width="100%"
        theme="primary"
        size="large"
        href={routes.MYPAGE}>
        {MENU_ABOUT_TITLE}
      </Link>
    </Container>
  );
};

export default Navigation;
