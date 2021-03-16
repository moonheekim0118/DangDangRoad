import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  height: 100%;
  z-index: 5000;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 35px 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-bottom: 1px solid ${colorCode['light-gray']};
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 70px;
  flex-wrap: wrap;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  flex-basis: 50%;
  align-items: center;
`;

export const UploadImageButton = styled.button`
  width: 100%;
  border: 3px dashed ${colorCode['light-blue']};
  padding: 20px;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    border-color: ${colorCode['blue']};
  }
  &:focus {
    outline: none;
  }
`;

export const Description = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.2rem;
`;

export const LengthCounter = styled.span<{ error: boolean }>`
  margin-left: 10px;
  color: ${(props) => (props.error ? colorCode['red'] : colorCode['green'])};
  font-weight: bold;
`;

export const PlaceName = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.5rem;
  color: ${colorCode['blue']};
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

export const PlaceInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ButtonContainer = styled.div`
  width: 50%;
`;
