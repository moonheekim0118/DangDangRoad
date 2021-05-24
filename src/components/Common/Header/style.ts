import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

  background-color: var(--colors-blue);
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

export const UserInfoSummary = styled.summary`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #fff;
  &:focus {
    outline: none;
  }
  &&::marker {
    display: none;
  }
`;

export const MenuToggler = styled.div`
  margin-right: 1.5rem;
  display: none;
  align-items: center;
  flex-shrink: 1;
  @media only screen and (max-width: 910px) {
    display: flex;
  }
`;

export const MainContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 1;
  flex-grow: 1;
`;

export const Navigation = styled.div`
  position: absolute;
  align-self: center;
  width: 30%;
  left: 250px;

  @media only screen and (max-width: 910px) {
    width: 100%;
    position: relative;
    display: none;
    left: 0;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    > * {
      margin: 1rem 0;
    }
  }

  @media only screen and (min-width: 910px) {
    display: flex !important;
  }
`;

export const NavigationContents = styled.div`
  width: 100%;
  background-color: var(--colors-blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem 0.3rem;
  border-top: 1px solid #fff;

  > * {
    margin-top: 0.6rem;
  }

  @media only screen and (min-width: 910px) {
    display: none;
  } ;
`;
