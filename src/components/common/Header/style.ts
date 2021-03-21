import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const iconStyle = css`
  color: #fff;
  cursor: pointer;
`;

export const Container = styled.header`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px 30px;

  position: sticky;
  top: 0;

  background-color: ${colorCode['blue']};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  z-index: 4000;
`;

export const SideNavigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0 0.5rem;
  }
`;

export const HideInMobile = styled.div`
  width: 100%;
  @media only screen and (max-width: 920px) {
    display: none;
  }
`;

export const AuthDetailsContainer = styled.details`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > * {
    margin: 0 0.5rem;
  }
`;

export const UserInfoSummary = styled.summary`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #fff;
  &:focus {
    outline: none;
  }

  &::-webkit-details-marker {
    display: none;
  }
  &&::marker {
    display: none;
  }
`;

export const DetailsMenu = styled.menu`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
`;

export const MenuToggler = styled.div`
  margin-right: 25px;
  display: none;
  align-items: center;
  @media only screen and (max-width: 910px) {
    display: flex;
  }
`;

export const LogoContainer = styled.div`
  align-self: center;
  flex: auto;
`;

export const SearchBarContainer = styled.div`
  width: 30%;
  position: absolute;
  left: 250px;
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

export const ToggleContainer = styled.div`
  width: 100%;
  @media only screen and (min-width: 910px) {
    display: none;
  }
`;

export const NavigationContainer = styled.nav`
  display: none;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
`;

export const NavigationContents = styled.div`
  width: 100%;
  border-top: 1px solid #fff;
  background-color: ${colorCode['blue']};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  padding: 15px 20px;
  margin-top: 15px;

  > * {
    margin: 0.7rem 0;
  }
`;
