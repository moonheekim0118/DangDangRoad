import React from 'react';
import routes from 'common/constant/routes';
import { navLinkStyle } from 'common/style/baseStyle';
import { colorCode } from 'common/style/color';
import { MENU_MYPAGE_TITLE, MENU_SIGNUP_TITLE } from 'common/constant/string';
import { Button } from 'atoms';
import styled from '@emotion/styled';

interface Props {
  isLoggedIn: boolean;
}
const Navigation = ({ isLoggedIn }: Props): React.ReactElement => {
  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Item>
            <Button linkStyle={navLinkStyle} href={routes.MYPAGE}>
              {MENU_MYPAGE_TITLE}
            </Button>
          </Item>
        </>
      ) : (
        <>
          <Item>
            <Button linkStyle={navLinkStyle} href={routes.SIGNUP}>
              {MENU_SIGNUP_TITLE}
            </Button>
          </Item>
        </>
      )}
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  background-color: ${colorCode['blue']};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  padding: 10px 20px;
  margin-top: 15px;
`;

const Item = styled.div`
  width: 100%;
  padding: 20px;
  border-top: 1px solid #fff;
`;

export default Navigation;
