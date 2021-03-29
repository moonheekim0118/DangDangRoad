import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  > * {
    margin: 0 0.5rem;
  }
`;

export const PageButton = styled.button<{ current?: boolean }>`
  background-color: ${(props) =>
    props.current ? 'rgba(51, 153, 255,0.5)' : '#fff'};
  border: none;
  border-radius: 50%;
  font-size: 0.9rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: rgba(51, 153, 255, 0.3);
  }

  &:focus {
    outline: none;
  }
`;
