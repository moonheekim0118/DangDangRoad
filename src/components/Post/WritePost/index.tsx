import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { PlaceType } from 'types/Map';
import { createReview, updateReview } from 'api/review';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import RadioBox from 'components/common/RadioBox';
import { saveBtnStyle } from 'common/style/baseStyle';
import { SearchMap } from 'components/map';
import { PostImage } from 'components/post';
import { Title, Button } from 'atoms';
import { reviewData } from 'types/API';
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
  RAIDO_HAS_DONTKNOW_VALUE,
  RAIDO_AVAILABLE_DONTKNOW_VALUE,
  RAIDO_RECOMMENDATION_SOSO_VALUE,
} from 'common/constant/string';
import { ImageRef, defaultRef as imageDefaultRef } from 'types/Image';
import { inputRef, defaultRef as inputDefaultRef } from 'types/Input';
import TextArea from 'components/post/TextArea';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';
import * as S from './style';

interface Props {
  mode: 'create' | 'update';
  initialData?: reviewData;
  userId: string;
}

const WritePost = ({ mode, initialData, userId }: Props) => {
  const dispatch = useNotificationDispatch();

  const freeTextRef = useRef<inputRef>(inputDefaultRef);
  const hasParkingLotRef = useRef<inputRef>(inputDefaultRef);
  const hasOffLeashRef = useRef<inputRef>(inputDefaultRef);
  const recommendationRef = useRef<inputRef>(inputDefaultRef);
  const imageUrlRef = useRef<ImageRef>(
    imageDefaultRef(initialData?.imageList ? initialData.imageList : [])
  );

  const [fetchResult, fetchDispatch] = useApiFetch(
    mode === 'create' ? createReview : updateReview
  );

  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(
    initialData ? initialData.placeInfo : null
  );

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push(routes.SEARCH);
        break;
      case FAILURE:
        dispatch(Action.showError(fetchResult.error));
    }
  }, [fetchResult]);

  const selectPlaceHandler = useCallback(
    (place: PlaceType) => () => {
      setSelectedPlace(place);
    },
    []
  );

  // sumbit data to DataBase Handler
  const submitHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const { value: freeText, error: freeTextError } = freeTextRef.current;
      const { value: hasParkingLot } = hasParkingLotRef.current;
      const { value: hasOffLeash } = hasOffLeashRef.current;
      const { value: recommendation } = recommendationRef.current;
      const { value: imageUrl } = imageUrlRef.current;

      if (!selectedPlace) {
        return dispatch(Action.showError(NOT_SELECT_PLACE_ERROR));
      } else if (freeTextError) {
        return dispatch(Action.showError(FREE_TEXT_LIMIT_ERROR));
      }
      const data = {
        userId,
        hasParkingLot,
        hasOffLeash,
        recommendation,
        freeText,
        imageList: imageUrl,
        placeInfo: {
          address_name: selectedPlace.address_name,
          place_name: selectedPlace.place_name,
          x: selectedPlace.x,
          y: selectedPlace.y,
        },
      };
      fetchDispatch({
        type: REQUEST,
        params: mode === 'create' ? [data] : [initialData?.docId, data],
      });
    },
    [
      hasParkingLotRef,
      hasOffLeashRef,
      recommendationRef,
      selectedPlace,
      freeTextRef,
      imageUrlRef,
    ]
  );

  return (
    <S.Container>
      <S.TopContainer>
        <Title>{WRITE_REVIEW_TITLE}</Title>
      </S.TopContainer>
      <S.MainContainer>
        <SearchMap
          selectPlaceHandler={selectPlaceHandler}
          nowSelectedAddress={selectedPlace?.address_name}
          initialCoordX={selectedPlace?.x}
          initialCoordY={selectedPlace?.y}
        />
        <S.ReviewContainer>
          <S.PlaceName>{selectedPlace?.place_name}</S.PlaceName>
          <PostImage
            initialImageUrl={initialData?.imageList || []}
            ref={imageUrlRef}
          />
          <TextArea cols={15} ref={freeTextRef} />
          <S.PlaceInfo>
            <S.Label>{RADIO_BOX_LABEL}</S.Label>
            <S.RadioContainer>
              <RadioBox
                ref={hasParkingLotRef}
                title={RADIO_TITLE_PARKING_LOT}
                list={RADIO_LIST.has}
                initValue={
                  initialData
                    ? initialData.hasParkingLot
                    : RAIDO_HAS_DONTKNOW_VALUE
                }
              />
              <RadioBox
                ref={hasOffLeashRef}
                title={RADIO_TITLE_OFFLEASH}
                list={RADIO_LIST.available}
                initValue={
                  initialData
                    ? initialData.hasOffLeash
                    : RAIDO_AVAILABLE_DONTKNOW_VALUE
                }
              />
              <RadioBox
                ref={recommendationRef}
                title={RADIO_TITLE_RECOMMENDATION}
                list={RADIO_LIST.recomendation}
                initValue={
                  initialData
                    ? initialData.recommendation
                    : RAIDO_RECOMMENDATION_SOSO_VALUE
                }
              />
            </S.RadioContainer>
          </S.PlaceInfo>
        </S.ReviewContainer>
        <S.ButtonContainer>
          <Button
            className="saveBtn"
            css={saveBtnStyle}
            onClick={submitHandler}>
            {SAVE_CAPTION}
          </Button>
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
};

export default WritePost;
