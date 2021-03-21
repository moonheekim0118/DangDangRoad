import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 3000;
  > * {
    margin: 1rem 0;
  }
`;

export const TopContainer = styled.header`
  width: 100%;
  height: 35px;
  padding: 35px 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-bottom: 1px solid ${colorCode['light-gray']};
`;

export const MainContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(50vh, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 0 1.5rem;
`;

export const MapContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: grid;
  place-items: center;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  > * {
    margin: 1rem 0;
  }
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
  display: grid;
  place-items: center;
  width: 100%;
`;
