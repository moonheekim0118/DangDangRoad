import styled from '@emotion/styled';

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
