import React from 'react';
import { colorCode } from '../../model/colorCode';
import Anchor from '../../atoms/Anchor';
import SearchBar from '../SearchBar';
import styled from '@emotion/styled';

const isLoggedIn = false;

const Navigation = () => {
  return (
    <Container>
      <Item>
        <SearchBar color="blue" />
      </Item>
      {isLoggedIn ? (
        <>
          <Item>
            <Anchor
              fontsize={1.2}
              color="white"
              hoverColor="light-gray"
              title="MyReviews"
              path="/login"
            />
          </Item>
          <Item>
            <Anchor fontsize={1.2} color="white" title="MyPage" path="/login" />
          </Item>
        </>
      ) : (
        <>
          <Item>
            <Anchor
              fontsize={1.2}
              color="white"
              hoverColor="light-gray"
              title="SIGNUP"
              path="/signUp"
            />
          </Item>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${colorCode['blue']};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  padding: 10px 20px;

  @media only screen and (min-width: 910px) {
    display: none;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 20px;

  &:not(:first-of-type) {
    border-top: 1px solid #fff;
  }
`;
export default Navigation;
