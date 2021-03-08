import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 500px) {
    border-radius: 0;
  }
`;

export const Menu = styled.div<{ warn: boolean; visiting: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: ${(props) => (props.warn ? 'red' : 'black')};
  background-color: ${(props) => props.visiting && '#e0e0e0'};

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.warn ? 'rgba(255, 0, 0,0.2)' : '#e0e0e0'};
  }

  &:first-of-type {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    @media only screen and (max-width: 500px) {
      border-radius: 0;
    }
  }

  &:last-of-type {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    @media only screen and (max-width: 500px) {
      border-radius: 0;
    }
  }
`;
