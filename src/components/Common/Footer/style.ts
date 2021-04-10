import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const githubIconStyle = css`
  transition: color 0.5s ease;
  &:hover {
    color: var(--colors-light-blue);
  }
`;

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 2.5rem;
  background-color: #fbfbfb;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--colors-light-gray);
  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    min-height: 75%;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    margin: 0.5rem 0;
  }

  @media (min-width: 1024px) {
    grid-column: span 2 / span 2;
    margin: 0;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  @media (min-width: 1024px) {
    grid-column: span 6 / span 6;
    justify-content: flex-end;
  }
`;

export const HomePageDescription = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
  justify-content: space-between;
  align-items: center;
  padding: 1.7rem 0;
`;

export const Text = styled.span`
  font-size: 0.9rem;
  color: gray;
`;
