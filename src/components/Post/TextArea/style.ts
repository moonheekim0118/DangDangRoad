import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Label = styled.label`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.2rem;
`;

export const Description = styled.div`
  width: 100%;
`;

export const LengthCounter = styled.span<{ error: boolean }>`
  margin-left: 10px;
  color: ${(props) => (props.error ? colorCode['red'] : colorCode['green'])};
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  margin-top: 10px;
  padding: 20px;
  height: 100px;
  font-size: 1rem;
  background-color: #fff;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  &:focus {
    outline: none;
  }
`;
