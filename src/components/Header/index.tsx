import React from 'react';
import { colorCode } from '../../model/colorCode';
import Logo from '../Logo';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import SearchBar from '../SearchBar';
import styled from '@emotion/styled';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <Container>
      <Side>
        <MenuToggler>
          <Icon iconsize={20} icon={faList} color="white" cursor="pointer" />
        </MenuToggler>
        <LogoContainer>
          <Logo color="white" />
        </LogoContainer>
      </Side>
      <SearchBarContainer>
        <SearchBar color="blue" />
      </SearchBarContainer>
      <Side>
        <Span
          fontsize={1.2}
          color="white"
          title="LOGIN"
          margin="0 20px 0 0"
          bold={true}
          cursor={'pointer'}
        />
        <Span
          fontsize={1.2}
          color="white"
          title="SIGNUP"
          bold={true}
          cursor={'pointer'}
        />
      </Side>
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

  @media only screen and (max-width: 400px) {
    padding: 0 10px;
  }
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const MenuToggler = styled.div`
  opacity: 0;
  margin-right: 25px;
  @media only screen and (max-width: 850px) {
    opacity: 1;
  }
`;

const LogoContainer = styled.div`
  @media only screen and (max-width: 320px) {
    opacity: 0;
  }
`;

const SearchBarContainer = styled.div`
  width: 300px;
  position: absolute;
  left: 250px;
  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

export default Header;
