import { useEffect, useState, useCallback } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { useLoginInfoState } from 'context/LoginInfo';
import { useInput, useValidation, useImageUpload } from 'hooks';
import { PlaceType } from 'types/Map';
import { freeTextLengthCheck } from 'util/reviewTextValidation';
import { createReview } from 'api/review';
import useApiFetch, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiFetch';

import Router from 'next/router';
import * as Action from 'action';

const useWritePost = () => {
  const dispatch = useNotificationDispatch();
  const [fetchResult, fetchDispatch] = useApiFetch(createReview);
  const { userId } = useLoginInfoState();
  /** has Parking lot Radio value*/
  const [hasParkingLot, hasParkingLotHandler] = useInput('몰라요');
  /** off leash Avalibale Raido value */
  const [hasOffLeash, hasOffLeashHandler] = useInput('몰라요');
  /** Recommenation Radio value*/
  const [recommendation, recommendationHandler] = useInput('추천해요');
  /** selected Place */
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  /** Free text Input value with Validation of Text Length */
  const {
    value: freeText,
    error: freeTextError,
    valueChangeHanlder: freeTextHandler,
  } = useValidation({ characterCheck: freeTextLengthCheck });

  const [
    imageInput,
    imageUrl,
    uploaderClickHanlder,
    uploadImageHanlder,
    removeImageHanlder,
  ] = useImageUpload({
    initialImages: [],
    imageLimit: 3,
    dispatch,
  });

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push('/search');
        break;
      case FAILURE:
        dispatch(Action.showError(fetchResult.error));
    }
  }, [fetchResult]);

  // to store Selected Place
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
      if (!selectedPlace) {
        return dispatch(Action.showError('장소를 선택해주세요!'));
      } else if (freeTextError) {
        return dispatch(
          Action.showError('글자수는 100자 이하까지 입력 가능합니다.')
        );
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
      fetchDispatch({ type: REQUEST, params: [data] });
    },
    [
      hasParkingLot,
      hasOffLeash,
      recommendation,
      selectedPlace,
      freeText,
      freeTextError,
      imageUrl,
      selectedPlace,
    ]
  );

  return {
    hasParkingLot,
    hasParkingLotHandler,
    hasOffLeash,
    hasOffLeashHandler,
    recommendation,
    recommendationHandler,
    freeText,
    freeTextError,
    freeTextHandler,
    uploaderClickHanlder,
    uploadImageHanlder,
    removeImageHanlder,
    imageInput,
    selectedPlace,
    selectPlaceHandler,
    imageUrl,
    submitHandler,
  };
};

export default useWritePost;
