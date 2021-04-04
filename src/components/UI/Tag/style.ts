import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 300px;
  display: flex;
  background-color: #fd2a1d;
  color: #fff;
  font-weight: bold;
  border-radius: 50px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const Text = styled.span`
  padding: 0.4rem;
  align-self: center;
`;
