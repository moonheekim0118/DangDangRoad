import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { createReview } from 'api/review';
import { PlaceType } from 'types/Map';
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
  SAVE_MESSAGE,
} from 'common/constant/string';
import { RefType, defaultRef, InputRef, inputDefaultRef } from 'types/Ref';
import { PostEditor } from 'components/post';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';

interface Props {
  userId: string;
}

const WritePost = ({ userId }: Props) => {
  const dispatch = useNotificationDispatch();

  const freeTextRef = useRef<InputRef>(inputDefaultRef());
  const hasParkingLotRef = useRef<InputRef>(inputDefaultRef());
  const hasOffLeashRef = useRef<InputRef>(inputDefaultRef());
  const recommendationRef = useRef<InputRef>(inputDefaultRef());
  const imageUrlRef = useRef<RefType<string[]>>(defaultRef<string[]>([]));

  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(createReview);

  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        dispatch(Action.showNoti(SAVE_MESSAGE));
        Router.push(routes.SEARCH);
        break;
      case FAILURE:
        dispatch(Action.showError(fetchResult.error));
        setDefault();
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
        params: [data],
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
    <PostEditor
      selectPlaceHandler={selectPlaceHandler}
      selectedPlace={selectedPlace}
      imageList={[]}
      imageUrlRef={imageUrlRef}
      freeTextRef={freeTextRef}
      freeText=""
      hasParkingLotRef={hasParkingLotRef}
      hasParkingLot={RAIDO_HAS_DONTKNOW_VALUE}
      hasOffLeashRef={hasOffLeashRef}
      hasOffLeash={RAIDO_AVAILABLE_DONTKNOW_VALUE}
      recommendationRef={recommendationRef}
      recommendation={RAIDO_RECOMMENDATION_SOSO_VALUE}
      submitHandler={submitHandler}
    />
  );
};

export default WritePost;
