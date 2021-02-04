import React from 'react';
import Logo from '../Logo';
import Icon from '../../atoms/Icon';
import Anchor from '../../atoms/Anchor';
import Span from '../../atoms/Span';
import SearchBar from '../SearchBar';
import styled from '@emotion/styled';
import { colorCode } from '../../model/colorCode';
import { faList } from '@fortawesome/free-solid-svg-icons';

interface Props {
  toggleHandler: () => void;
}

const isLoggedIn = false;

const Header = ({ toggleHandler }: Props) => {
  return (
    <Container>
      <SideContainer>
        <MenuToggler>
          <Icon
            iconsize={20}
            icon={faList}
            color="white"
            cursor="pointer"
            iconClickHandler={toggleHandler}
          />
        </MenuToggler>
        <LogoContainer>
          <Logo color="white" />
        </LogoContainer>
      </SideContainer>
      <SearchBarContainer>
        <SearchBar color="blue" />
      </SearchBarContainer>
      <SideContainer>
        {isLoggedIn ? (
          <>
            <ExtraMenuContainer>
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                title="MyReviews"
                margin="0 20px 0 0"
                path="/"
              />
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                title="MyPage"
                margin="0 20px 0 0"
                path="/"
              />
            </ExtraMenuContainer>
            <Span
              fontsize={1.2}
              color="white"
              title="LOGOUT"
              hoverColor="light-gray"
              cursor="pointer"
              bold={true}
            />
          </>
        ) : (
          <>
            <Span
              fontsize={1.2}
              color="white"
              title="LogIn"
              hoverColor="light-gray"
              margin="0 20px 0 0"
              cursor="pointer"
              bold={true}
            />
            <ExtraMenuContainer>
              <Anchor
                fontsize={1.2}
                color="white"
                hoverColor="light-gray"
                title="SignUp"
                path="/"
              />
            </ExtraMenuContainer>
          </>
        )}
      </SideContainer>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 30px;

  background-color: ${colorCode['blue']};
  z-index: 4000;

  @media only screen and (max-width: 400px) {
    padding: 0 10px;
  }
`;

const SideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const MenuToggler = styled.div`
  opacity: 0;
  margin-right: 25px;
  @media only screen and (max-width: 910px) {
    opacity: 1;
  }
`;

const LogoContainer = styled.div`
  @media only screen and (max-width: 320px) {
    opacity: 0;
  }
`;

const SearchBarContainer = styled.div`
  width: 30%;
  position: absolute;
  left: 250px;
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

const ExtraMenuContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;
export default Header;
