import styled from '@emotion/styled';

export const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 570px) {
    border-radius: 0;
  }
`;

export const MenuList = styled.li<{ warn: boolean; visiting: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: ${(props) => (props.warn ? 'var(--colors-red)' : 'black')};
  background-color: ${(props) => props.visiting && 'var(--colors-light-gray)'};

  transition: background-color 0.3s ease;
  list-style-type: none;

  &:hover {
    background-color: ${(props) =>
      props.warn ? 'rgba(255, 0, 0,0.2)' : 'var(--colors-light-gray)'};
  }

  &:first-of-type {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    @media only screen and (max-width: 570px) {
      border-radius: 0;
    }
  }

  &:last-of-type {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    @media only screen and (max-width: 570px) {
      border-radius: 0;
    }
  }
`;

export const Menu = styled.li`
  width: 100%;
`;
