import styled from '@emotion/styled';

export const UploadImageButton = styled.button`
  width: 100%;
  border: 3px dashed var(--colors-light-blue);
  padding: 1.1rem;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--colors-blue);
  }
  &:focus {
    outline: none;
  }
`;
