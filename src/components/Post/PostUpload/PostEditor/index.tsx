import React, { useCallback, useMemo } from 'react';
import {
  WRITE_REVIEW_TITLE,
  RADIO_TITLE_PARKING_LOT,
  RADIO_TITLE_OFFLEASH,
  RADIO_TITLE_RECOMMENDATION,
  SAVE_CAPTION,
  NEXT_CAPTION,
  PREV_CAPTION,
  RADIO_LIST,
  NOT_SELECT_PLACE_ERROR,
  FREE_TEXT_LIMIT_ERROR,
  WRITE_REVIEW_SELECT_PLACE_TITLE,
  WRITE_REVIEW_ADD_CONTENTS_TITLE,
  WRITE_REVIEW_ADD_RADIO_INPUT,
} from 'common/constant/string';
import { RefType, InputRef } from 'types/Ref';
import { SearchMap } from 'components/Map';
import { PostImage, PostText } from 'components/Post/PostUpload';
import { Title, Button, RadioBox } from 'components/UI';
import { PlaceType } from 'types/Map';
import { useSlide } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import * as S from './style';
import * as Action from 'action';

const TOTAL_SLIDES = 3;

interface Props {
  selectPlaceHandler: (place: PlaceType) => () => void;
  selectedPlace: PlaceType | null;
  imageList: string[];
  imageUrlRef: React.RefObject<RefType<string[]>>;
  freeTextRef: React.RefObject<InputRef>;
  freeText: string;
  hasParkingLotRef: React.RefObject<InputRef>;
  hasParkingLot: string;
  hasOffLeashRef: React.RefObject<InputRef>;
  hasOffLeash: string;
  recommendationRef: React.RefObject<InputRef>;
  recommendation: string;
  loading: boolean;
  submitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostEditor = (props: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const { index, slideRef, toPrev, toNext, setIndex } = useSlide({
    totalSlide: TOTAL_SLIDES,
  });

  const validatedSubmitHanlder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (slideRef.current) {
        if (!props.selectedPlace) {
          slideRef.current.style.transform = `translateX(0)`;
          slideRef.current.style.transition = 'all 0.5s ease-in-out';
          notiDispatch(Action.showError(NOT_SELECT_PLACE_ERROR));
          return setIndex(0);
        }

        if (props.freeTextRef.current) {
          const { value, error } = props.freeTextRef.current;
          if (value.length <= 0 || error) {
            slideRef.current.style.transform = `translateX(-100%)`;
            slideRef.current.style.transition = 'all 0.5s ease-in-out';
            notiDispatch(Action.showError(FREE_TEXT_LIMIT_ERROR));
            return setIndex(1);
          }
        }
      }
      props.submitHandler(e);
    },
    [props.selectedPlace]
  );

  const NextBtn = useMemo(
    (): React.ReactElement => (
      <Button theme="primary" size="large" width="40%" onClick={toNext}>
        {NEXT_CAPTION}
      </Button>
    ),
    [index]
  );

  const PrevBtn = useMemo(
    (): React.ReactElement => (
      <Button theme="primary" size="large" width="40%" onClick={toPrev}>
        {PREV_CAPTION}
      </Button>
    ),
    [index]
  );

  return (
    <>
      <S.Header>
        <S.PlaceName>
          {props.selectedPlace?.place_name
            ? props.selectedPlace?.place_name
            : '선택 안됨'}
        </S.PlaceName>
        <Title>{WRITE_REVIEW_TITLE}</Title>
      </S.Header>
      <S.Container>
        <S.Component ref={slideRef}>
          <S.MainContainer>
            <S.Label>{WRITE_REVIEW_SELECT_PLACE_TITLE}</S.Label>
            <SearchMap
              selectPlaceHandler={props.selectPlaceHandler}
              nowSelectedAddress={props.selectedPlace?.address_name}
              initialCoordX={props.selectedPlace?.x}
              initialCoordY={props.selectedPlace?.y}
            />
          </S.MainContainer>
          <S.MainContainer>
            <S.Label>{WRITE_REVIEW_ADD_CONTENTS_TITLE}</S.Label>
            <S.ReviewContainer>
              <S.PostImageContainer>
                <PostImage
                  initialImageUrl={props.imageList || []}
                  ref={props.imageUrlRef}
                />
              </S.PostImageContainer>
              <PostText
                cols={15}
                initValue={props.freeText}
                ref={props.freeTextRef}
              />
            </S.ReviewContainer>
          </S.MainContainer>
          <S.MainContainer>
            <S.Label>{WRITE_REVIEW_ADD_RADIO_INPUT}</S.Label>
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
          </S.MainContainer>
        </S.Component>
        <S.ControllerContainer>
          {index === 0 ? (
            <S.ButtonContainer>
              <div></div>
              {NextBtn}
            </S.ButtonContainer>
          ) : (
            <S.ButtonContainer>
              {index === TOTAL_SLIDES - 1 ? (
                <>
                  {PrevBtn}
                  <Button
                    theme="primary"
                    type="submit"
                    size="large"
                    width="40%"
                    onClick={validatedSubmitHanlder}
                    loading={props.loading}>
                    {SAVE_CAPTION}
                  </Button>
                </>
              ) : (
                <>
                  {PrevBtn}
                  {NextBtn}
                </>
              )}
            </S.ButtonContainer>
          )}
        </S.ControllerContainer>
      </S.Container>
    </>
  );
};

export default PostEditor;
