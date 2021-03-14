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
  lign-height: 1.5;

  background-color: ${colorCode['blue']};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  z-index: 4000;

  @media only screen and (max-width: 400px) {
    padding: 0 10px;
  }
`;

export const SideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
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

export const NavigationContainer = styled.div`
  display: none;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
`;
