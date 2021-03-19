import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const UploadImageButton = styled.button`
  width: 100%;
  border: 3px dashed ${colorCode['light-blue']};
  padding: 1.1rem;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    border-color: ${colorCode['blue']};
  }
  &:focus {
    outline: none;
  }
`;
