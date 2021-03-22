import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  WRITE_REVIEW_TITLE,
  RADIO_BOX_LABEL,
  RADIO_TITLE_PARKING_LOT,
  RADIO_TITLE_OFFLEASH,
  RADIO_TITLE_RECOMMENDATION,
  SAVE_CAPTION,
  RADIO_LIST,
  NOT_SELECT_PLACE_ERROR,
  FREE_TEXT_LIMIT_ERROR,
} from 'common/constant/string';
import { RefType, InputRef } from 'types/Ref';
import { SearchMap } from 'components/Map';
import { PostImage, PostText } from 'components/Post/PostUpload';
import { Title, Button, RadioBox } from 'components/ui';
import { PlaceType } from 'types/Map';
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

const PostEditor = (props: Props) => {
  const dispatch = useNotificationDispatch();
  const [index, setIndex] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${index}00%)`;
    }
  }, [index]);

  const toPrev = useCallback(() => {
    index > 0 && setIndex(index - 1);
  }, [index]);

  const toNext = useCallback(() => {
    index < 3 && setIndex(index + 1);
  }, [index]);

  const validatedSubmitHanlder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (slideRef.current) {
        if (!props.selectedPlace) {
          slideRef.current.style.transform = `translateX(0)`;
          slideRef.current.style.transition = 'all 0.5s ease-in-out';
          dispatch(Action.showError(NOT_SELECT_PLACE_ERROR));
          return setIndex(0);
        }

        if (props.freeTextRef.current) {
          const { value, error } = props.freeTextRef.current;
          if (value.length <= 0 || error) {
            slideRef.current.style.transform = `translateX(-100%)`;
            slideRef.current.style.transition = 'all 0.5s ease-in-out';
            dispatch(Action.showError(FREE_TEXT_LIMIT_ERROR));
            return setIndex(1);
          }
        }
      }
      props.submitHandler(e);
    },
    [props.selectedPlace]
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
            <S.Label>1. 지도에서 산책로를 선택해주세요</S.Label>
            <SearchMap
              selectPlaceHandler={props.selectPlaceHandler}
              nowSelectedAddress={props.selectedPlace?.address_name}
              initialCoordX={props.selectedPlace?.x}
              initialCoordY={props.selectedPlace?.y}
            />
          </S.MainContainer>
          <S.MainContainer>
            <S.Label>2. 글과 사진으로 리뷰를 남겨주세요</S.Label>
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
            <S.Label>3.{RADIO_BOX_LABEL}</S.Label>
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
              <Button theme="primary" size="large" width="40%" onClick={toNext}>
                다음
              </Button>
            </S.ButtonContainer>
          ) : (
            <S.ButtonContainer>
              {index === TOTAL_SLIDES - 1 ? (
                <>
                  <Button
                    theme="primary"
                    size="large"
                    width="40%"
                    onClick={toPrev}>
                    이전
                  </Button>
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
                  <Button
                    theme="primary"
                    size="large"
                    width="40%"
                    onClick={toPrev}>
                    이전
                  </Button>
                  <Button
                    theme="primary"
                    size="large"
                    width="40%"
                    onClick={toNext}>
                    다음
                  </Button>
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
