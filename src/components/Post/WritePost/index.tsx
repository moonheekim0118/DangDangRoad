import React from 'react';
import RadioBox from 'components/ui/RadioBox';
import { saveBtnStyle } from 'common/style/baseStyle';
import { SearchMap } from 'components/map';
import { ImagePreview } from 'components/image';
import { useWritePost } from 'hooks';
import { Title, Button } from 'atoms';
import { reviewData } from 'types/API';
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
import * as S from './style';

interface Props {
  mode: 'create' | 'update';
  initialData?: reviewData;
}

const WritePost = ({ mode, initialData }: Props) => {
  const data = useWritePost({ mode, initialData });
  return (
    <S.Container>
      <S.TopContainer>
        <Title>{WRITE_REVIEW_TITLE}</Title>
      </S.TopContainer>
      <S.MainContainer>
        <SearchMap
          selectPlaceHandler={data.selectPlaceHandler}
          nowSelectedAddress={data.selectedPlace?.place_name}
          initialCoordX={data.selectedPlace?.x}
          initialCoordY={data.selectedPlace?.y}
        />
        <S.ReviewContainer>
          <S.PlaceName>{data.selectedPlace?.place_name}</S.PlaceName>
          {data.imageUrl.length <= 0 ? (
            <S.UploadImageButton onClick={data.uploaderClickHanlder}>
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
            </S.UploadImageButton>
          ) : (
            <ImagePreview
              imageList={data.imageUrl}
              uploaderClickHanlder={data.uploaderClickHanlder}
              imageInput={data.imageInput}
              imageUploadHanlder={data.uploadImageHanlder('add')}
              imageRemoveHanlder={data.removeImageHanlder}
            />
          )}
          <S.Description>
            <S.Label htmlFor="description">{FREE_TEXT_LABEL}</S.Label>
            <S.LengthCounter error={data.freeTextError}>
              {data.freeText.length}/{FREE_TEXT_LIMIT}
            </S.LengthCounter>
            <S.TextArea
              id="description"
              cols={15}
              value={data.freeText}
              onChange={data.freeTextHandler}
            />
          </S.Description>
          <S.PlaceInfo>
            <S.Label>{RADIO_BOX_LABEL}</S.Label>
            <S.RadioContainer>
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
            </S.RadioContainer>
          </S.PlaceInfo>
        </S.ReviewContainer>
        <S.ButtonContainer>
          <Button
            className="saveBtn"
            css={saveBtnStyle}
            onClick={data.submitHandler}>
            {SAVE_CAPTION}
          </Button>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
};

export default WritePost;
