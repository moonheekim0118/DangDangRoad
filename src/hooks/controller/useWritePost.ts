import { useEffect, useCallback, useState } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { useLoginInfoState } from 'context/LoginInfo';
import { useInput, useValidation, useImageUpload } from 'hooks';
import { PlaceType } from 'types/Map';
import { reviewData } from 'types/API';
import { freeTextLengthCheck } from 'util/reviewTextValidation';
import { createReview, updateReview } from 'api/review';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import {
  NOT_SELECT_PLACE_ERROR,
  FREE_TEXT_LIMIT_ERROR,
  RAIDO_HAS_DONTKNOW_VALUE,
  RAIDO_AVAILABLE_DONTKNOW_VALUE,
  RAIDO_RECOMMENDATION_SOSO_VALUE,
} from 'common/constant/string';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';

interface Props {
  mode: 'create' | 'update';
  initialData?: reviewData;
}

const useWritePost = ({ mode, initialData }: Props) => {
  const dispatch = useNotificationDispatch();
  const [fetchResult, fetchDispatch] = useApiFetch(
    mode === 'create' ? createReview : updateReview
  );
  const { userId } = useLoginInfoState();
  /** has Parking lot Radio value*/
  const [hasParkingLot, hasParkingLotHandler] = useInput(
    initialData ? initialData.hasParkingLot : RAIDO_HAS_DONTKNOW_VALUE
  );
  /** off leash Avalibale Raido value */
  const [hasOffLeash, hasOffLeashHandler] = useInput(
    initialData ? initialData.hasOffLeash : RAIDO_AVAILABLE_DONTKNOW_VALUE
  );
  /** Recommenation Radio value*/
  const [recommendation, recommendationHandler] = useInput(
    initialData ? initialData.recommendation : RAIDO_RECOMMENDATION_SOSO_VALUE
  );
  /** Free text Input value with Validation of Text Length */
  const [freeText, freeTextError, freeTextHandler] = useValidation({
    initialValue: initialData ? initialData.freeText : '',
    validator: freeTextLengthCheck,
  });

  /** selected Place */
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(
    initialData ? initialData.placeInfo : null
  );

  const [
    imageInput,
    imageUrl,
    uploaderClickHanlder,
    uploadImageHanlder,
    removeImageHanlder,
  ] = useImageUpload({
    initialImages: initialData?.imageList ? initialData.imageList : [],
    imageLimit: 3,
    dispatch,
  });

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push(routes.SEARCH);
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
      hasParkingLot,
      hasOffLeash,
      recommendation,
      selectedPlace,
      freeText,
      freeTextError,
      imageUrl,
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
