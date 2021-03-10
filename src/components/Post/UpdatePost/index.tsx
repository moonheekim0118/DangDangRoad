import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { updateReview } from 'api/review';
import { PlaceType } from 'types/Map';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import {
  NOT_SELECT_PLACE_ERROR,
  FREE_TEXT_LIMIT_ERROR,
} from 'common/constant/string';
import { ReviewData } from 'types/API';
import { RefType, defaultRef, InputRef, inputDefaultRef } from 'types/Ref';
import { PostEditor } from 'components/post';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';

interface Props {
  initialData: ReviewData;
  userId: string;
}

const UpdatePost = ({ initialData, userId }: Props) => {
  const dispatch = useNotificationDispatch();

  const freeTextRef = useRef<InputRef>(inputDefaultRef(initialData.freeText));
  const hasParkingLotRef = useRef<InputRef>(
    inputDefaultRef(initialData.hasParkingLot)
  );
  const hasOffLeashRef = useRef<InputRef>(
    inputDefaultRef(initialData.hasOffLeash)
  );
  const recommendationRef = useRef<InputRef>(
    inputDefaultRef(initialData.recommendation)
  );
  const imageUrlRef = useRef<RefType<string[]>>(
    defaultRef<string[]>(initialData.imageList ? initialData.imageList : [])
  );

  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(updateReview);

  const [selectedPlace, setSelectedPlace] = useState<PlaceType>(
    initialData.placeInfo
  );

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
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
        params: [initialData?.docId, data],
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
      imageList={initialData.imageList || []}
      imageUrlRef={imageUrlRef}
      freeTextRef={freeTextRef}
      hasParkingLotRef={hasParkingLotRef}
      hasParkingLot={initialData.hasParkingLot}
      hasOffLeashRef={hasOffLeashRef}
      hasOffLeash={initialData.hasOffLeash}
      recommendationRef={recommendationRef}
      recommendation={initialData.recommendation}
      submitHandler={submitHandler}
    />
  );
};

export default UpdatePost;
