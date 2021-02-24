import React from 'react';
import styled from '@emotion/styled';
import Map from 'components/Map/SearchMap';
import RadioBox from 'components/RadioBox';
import ImagePreview from 'components/Image/ImagePreview';
import { useWritePost } from 'hooks';
import { colorCode } from 'types/Color';
import { Title, Button } from 'atoms';
import * as list from 'util/radioList';

const WritePost = () => {
  const data = useWritePost();

  return (
    <Container>
      <TopContainer>
        <Title>리뷰 작성</Title>
      </TopContainer>
      <MainContainer>
        <Map
          selectPlaceHandler={data.selectPlaceHandler}
          nowSelectedAddress={data.selectedPlace?.place_name}
        />
        <ReviewContainer>
          <PlaceName>{data.selectedPlace?.place_name}</PlaceName>
          {!data.imageList && (
            <UploadImageButton onClick={data.ClickImageUploadHandler}>
              사진 업로드📸 <br />
              (최대 3장까지 업로드 가능합니다)
              <input
                type="file"
                multiple
                name="image"
                hidden
                ref={data.imageInput}
                onChange={data.UploadImageHanlder}
              />
            </UploadImageButton>
          )}
          {data.imageList && <ImagePreview imageList={data.imageList} />}
          <Description>
            <Label htmlFor="description">
              자유롭게 장소에 대해 적어주세요 ✨
            </Label>
            <TextArea
              id="description"
              cols={15}
              value={data.freeText}
              onChange={data.freeTextHandler}
            />
          </Description>
          <PlaceInfo>
            <Label>장소에대해 알려주세요 🌠</Label>
            <RadioContainer>
              <RadioBox
                selectedValue={data.hasParkingLot}
                selectHandler={data.hasParkingLotHandler}
                title="주차장이 있나요?"
                list={list.has}
              />
              <RadioBox
                selectedValue={data.hasOffLeash}
                selectHandler={data.hasOffLeashHandler}
                title="오프리쉬 가능한가요?"
                list={list.available}
              />
              <RadioBox
                selectedValue={data.recommendation}
                selectHandler={data.recommendationHandler}
                title="다른 멍멍이들에게 추천하나요?"
                list={list.recomendation}
              />
            </RadioContainer>
          </PlaceInfo>
        </ReviewContainer>
        <ButtonContainer>
          <Button color="blue">저장하기</Button>
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
