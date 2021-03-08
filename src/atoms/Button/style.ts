import styled from '@emotion/styled';

export const Component = styled.button`
  font-size: 1.2rem;
  background-color: inherit;
  color: inherit;
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 13px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;

export const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;
