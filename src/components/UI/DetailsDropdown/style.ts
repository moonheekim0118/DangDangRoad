import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
  max-width: 250px;
  min-width: 150px;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.35);
  z-index: 4001;
`;

export const Menu = styled.div`
  color: black;
  padding: 0.9rem 1.5rem;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: var(--colors-light-blue);
  }

  &:first-of-type {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  &:last-of-type {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
`;

export const detailThemes = {
  primary: css`
    right: 0;
    flex-shrink: 0;
    cursor: pointer;
    > summary {
      display: block;
      &:focus {
        outline: none;
      }
    }
  `,
  secondary: css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > * {
      margin: 0 0.5rem;
    }
  `,
};

export const menuThemes = {
  primary: css`
    position: absolute;
    right: 1rem;
  `,
  secondary: css`
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
  `,
};

// Theme 넣어서 스타일링으로 받아주도록 수정
// children으로 DropDown 넣기
