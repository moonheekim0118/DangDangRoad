import React from 'react';
import { colorCode } from 'types/Color';
import { Anchor } from 'atoms';
import { MENU_MYPAGE_TITLE, MENU_SIGNUP_TITLE } from 'common/constant/string';
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
            <Anchor
              fontsize={1.2}
              color="white"
              hoverColor="light-gray"
              path="/myPage">
              {MENU_MYPAGE_TITLE}
            </Anchor>
          </Item>
        </>
      ) : (
        <>
          <Item>
            <Anchor
              fontsize={1.2}
              color="white"
              hoverColor="light-gray"
              path="/signUp">
              {MENU_SIGNUP_TITLE}
            </Anchor>
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
