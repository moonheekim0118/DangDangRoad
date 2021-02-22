import React from 'react';
import styled from '@emotion/styled';
import Map from 'components/Map';
import RadioBox from 'components/RadioBox';
import { useInput } from 'hooks';
import { colorCode } from 'types/Color';
import { Title, Button } from 'atoms';

const list = [
  { id: 'yes', value: '있어요' },
  { id: 'no', value: '없어요' },
  { id: 'dontknow', value: '몰라요' },
];

const WritePost = () => {
  const [parkingLot, parkingLotHandler] = useInput();

  return (
    <Container>
      <TopContainer>
        <Title>리뷰 작성</Title>
      </TopContainer>
      <MainContainer>
        <Map />
        <ReviewContainer>
          <UploadImageButton>
            사진을 업로드📸 <br />
            (최대 3장까지 업로드 가능합니다)
          </UploadImageButton>
          <Description>
            <Label htmlFor="description">
              자유롭게 장소에 대해 적어주세요 ✨
            </Label>
            <TextArea id="description" cols={15}></TextArea>
          </Description>
          <RadioContainer>
            <RadioBox
              selectedValue={parkingLot}
              selectHandler={parkingLotHandler}
              title="주차장 잇냐"
              list={list}
            />
            <RadioBox
              selectedValue={parkingLot}
              selectHandler={parkingLotHandler}
              title="주차장 잇냐"
              list={list}
            />
            <RadioBox
              selectedValue={parkingLot}
              selectHandler={parkingLotHandler}
              title="주차장 잇냐"
              list={list}
            />
          </RadioContainer>
          <Button color="blue">저장하기</Button>
        </ReviewContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 5000;
`;

const TopContainer = styled.div`
  width: 100%;
  max-height: 50px;
  padding: 35px 80px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-bottom: 1px solid ${colorCode['light-gray']};
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
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

const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export default WritePost;
