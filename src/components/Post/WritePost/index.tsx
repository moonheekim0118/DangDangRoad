import React from 'react';
import styled from '@emotion/styled';
import Map from 'components/Map/SearchMap';
import RadioBox from 'components/RadioBox';
import ImagePreview from 'components/Image/ImagePreview';
import { useWritePost } from 'hooks';
import { colorCode } from 'common/style/color';
import { Title, Button } from 'atoms';
import {
  WRITE_REVIEW_TITLE,
  IMAGE_UPLOAD_LABEL,
  IMAGE_UPLOAD_DESC,
  FREE_TEXT_LABEL,
  RADIO_BOX_LABEL,
  RADIO_TITLE_PARKING_LOT,
  RADIO_TITLE_OFFLEASH,
  RADIO_TITLE_RECOMMENDATION,
  SAVE_CAPTION,
  RADIO_LIST,
} from 'common/constant/string';
import { FREE_TEXT_LIMIT } from 'common/constant/number';

const WritePost = () => {
  const data = useWritePost();

  return (
    <Container>
      <TopContainer>
        <Title>{WRITE_REVIEW_TITLE}</Title>
      </TopContainer>
      <MainContainer>
        <Map
          selectPlaceHandler={data.selectPlaceHandler}
          nowSelectedAddress={data.selectedPlace?.place_name}
        />
        <ReviewContainer>
          <PlaceName>{data.selectedPlace?.place_name}</PlaceName>
          {data.imageUrl.length <= 0 ? (
            <UploadImageButton onClick={data.uploaderClickHanlder}>
              {IMAGE_UPLOAD_LABEL} <br />
              {IMAGE_UPLOAD_DESC}
              <input
                type="file"
                multiple
                name="image"
                hidden
                ref={data.imageInput}
                onChange={data.uploadImageHanlder('new')}
              />
            </UploadImageButton>
          ) : (
            <ImagePreview
              imageList={data.imageUrl}
              uploaderClickHanlder={data.uploaderClickHanlder}
              imageInput={data.imageInput}
              imageUploadHanlder={data.uploadImageHanlder('add')}
              imageRemoveHanlder={data.removeImageHanlder}
            />
          )}
          <Description>
            <Label htmlFor="description">{FREE_TEXT_LABEL}</Label>
            <LengthCounter error={data.freeTextError}>
              {data.freeText.length}/{FREE_TEXT_LIMIT}
            </LengthCounter>
            <TextArea
              id="description"
              cols={15}
              value={data.freeText}
              onChange={data.freeTextHandler}
            />
          </Description>
          <PlaceInfo>
            <Label>{RADIO_BOX_LABEL}</Label>
            <RadioContainer>
              <RadioBox
                selectedValue={data.hasParkingLot}
                selectHandler={data.hasParkingLotHandler}
                title={RADIO_TITLE_PARKING_LOT}
                list={RADIO_LIST.has}
              />
              <RadioBox
                selectedValue={data.hasOffLeash}
                selectHandler={data.hasOffLeashHandler}
                title={RADIO_TITLE_OFFLEASH}
                list={RADIO_LIST.available}
              />
              <RadioBox
                selectedValue={data.recommendation}
                selectHandler={data.recommendationHandler}
                title={RADIO_TITLE_RECOMMENDATION}
                list={RADIO_LIST.recomendation}
              />
            </RadioContainer>
          </PlaceInfo>
        </ReviewContainer>
        <ButtonContainer>
          <Button color="blue" onClick={data.submitHandler}>
            {SAVE_CAPTION}
          </Button>
        </ButtonContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  height: 100%;
  z-index: 5000;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 35px 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-bottom: 1px solid ${colorCode['light-gray']};
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 70px;
  flex-wrap: wrap;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  flex-basis: 50%;
  align-items: center;
`;

const UploadImageButton = styled.button`
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

const Description = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.2rem;
`;

const LengthCounter = styled.span<{ error: boolean }>`
  margin-left: 10px;
  color: ${(props) => (props.error ? colorCode['red'] : colorCode['green'])};
  font-weight: bold;
`;

const PlaceName = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.5rem;
  color: ${colorCode['blue']};
`;

const TextArea = styled.textarea`
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

const PlaceInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  width: 50%;
`;

export default WritePost;
