import React from 'react';
import {
  WRITE_REVIEW_TITLE,
  RADIO_BOX_LABEL,
  RADIO_TITLE_PARKING_LOT,
  RADIO_TITLE_OFFLEASH,
  RADIO_TITLE_RECOMMENDATION,
  SAVE_CAPTION,
  RADIO_LIST,
} from 'common/constant/string';
import { RefType, InputRef } from 'types/Ref';
import RadioBox from 'components/common/RadioBox';
import { saveBtnStyle } from 'common/style/baseStyle';
import { SearchMap } from 'components/map';
import { PostImage, TextArea } from 'components/post';
import { Title, Button } from 'atoms';
import { PlaceType } from 'types/Map';
import * as S from './style';

interface Props {
  selectPlaceHandler: (place: PlaceType) => () => void;
  selectedPlace: PlaceType | null;
  imageList: string[];
  imageUrlRef: React.Ref<RefType<string[]>>;
  freeTextRef: React.Ref<InputRef>;
  freeText: string;
  hasParkingLotRef: React.Ref<InputRef>;
  hasParkingLot: string;
  hasOffLeashRef: React.Ref<InputRef>;
  hasOffLeash: string;
  recommendationRef: React.Ref<InputRef>;
  recommendation: string;
  submitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostEditor = (props: Props) => {
  return (
    <S.Container>
      <S.TopContainer>
        <Title>{WRITE_REVIEW_TITLE}</Title>
      </S.TopContainer>
      <S.MainContainer>
        <SearchMap
          selectPlaceHandler={props.selectPlaceHandler}
          nowSelectedAddress={props.selectedPlace?.address_name}
          initialCoordX={props.selectedPlace?.x}
          initialCoordY={props.selectedPlace?.y}
        />
        <S.ReviewContainer>
          <S.PlaceName>{props.selectedPlace?.place_name}</S.PlaceName>
          <PostImage
            initialImageUrl={props.imageList || []}
            ref={props.imageUrlRef}
          />
          <TextArea
            cols={15}
            initValue={props.freeText}
            ref={props.freeTextRef}
          />
          <S.PlaceInfo>
            <S.Label>{RADIO_BOX_LABEL}</S.Label>
            <S.RadioContainer>
              <RadioBox
                ref={props.hasParkingLotRef}
                title={RADIO_TITLE_PARKING_LOT}
                list={RADIO_LIST.has}
                initValue={props.hasParkingLot}
              />
              <RadioBox
                ref={props.hasOffLeashRef}
                title={RADIO_TITLE_OFFLEASH}
                list={RADIO_LIST.available}
                initValue={props.hasOffLeash}
              />
              <RadioBox
                ref={props.recommendationRef}
                title={RADIO_TITLE_RECOMMENDATION}
                list={RADIO_LIST.recomendation}
                initValue={props.recommendation}
              />
            </S.RadioContainer>
          </S.PlaceInfo>
        </S.ReviewContainer>
        <S.ButtonContainer>
          <Button
            className="saveBtn"
            css={saveBtnStyle}
            onClick={props.submitHandler}>
            {SAVE_CAPTION}
          </Button>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
};

export default PostEditor;
