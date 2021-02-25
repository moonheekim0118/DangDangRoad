import { useState, useCallback } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { useLoginInfoState } from 'context/LoginInfo';
import { uploadPostImage } from 'api/storage';
import { createReview } from 'api/review';
import { useInput, useValidation, useImageInput } from 'hooks';
import { PlaceType } from 'types/Map';
import * as T from 'types/Review';
import * as Action from 'action';

const freeTextLengthCheck = (value) => {
  return value.length <= 100;
};

const useWritePost = () => {
  const dispatch = useNotificationDispatch();
  const { userId } = useLoginInfoState();
  /** has Parking lot Radio value*/
  const [hasParkingLot, hasParkingLotHandler] = useInput('몰라요');
  /** off leash Avalibale Raido value */
  const [hasOffLeash, hasOffLeashHandler] = useInput('몰라요');
  /** Recommenation Radio value*/
  const [recommendation, recommendationHandler] = useInput('추천해요');
  /** selected Place */
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | undefined>();
  /** Free text Input value with Validation of Text Length */
  const {
    value: freeText,
    error: freeTextError,
    valueChangeHanlder: freeTextHandler,
  } = useValidation({ characterCheck: freeTextLengthCheck });
  /** Image Input Ref */
  const [imageInput, uploaderClickHanlder] = useImageInput();

  /** image Url */
  const [imageList, setImageList] = useState<string[] | undefined>();

  const uploadImageHanlder = useCallback(async (e) => {
    try {
      const files = e.target.files;
      /** can upload 3 image file */
      if (files.length > 3) {
        return dispatch(
          Action.showError('이미지는 최대 3장까지 업로드 가능합니다.')
        );
      }
      const response = await uploadPostImage(files);
      if (!response.isError) {
        setImageList(response.url);
      } else {
        return dispatch(
          Action.showError(response.errorMessage || '잠시후 다시 시도해주세요')
        );
      }
    } catch (error) {
      dispatch(Action.showError('잠시후 다시 시도해주세요'));
    }
  }, []);

  const addImageHanlder = useCallback(
    async (e) => {
      try {
        const files = e.target.files;
        if (imageList && files.length + imageList.length > 3) {
          return dispatch(
            Action.showError('이미지는 최대 3장까지 업로드 가능합니다.')
          );
        }
        const response = await uploadPostImage(files);
        if (!response.isError && response.url) {
          // add to previous file
          setImageList(imageList?.concat(response.url));
        } else {
          return dispatch(
            Action.showError(
              response.errorMessage || '잠시후 다시 시도해주세요'
            )
          );
        }
      } catch (error) {
        dispatch(Action.showError('잠시후 다시 시도해주세요'));
      }
    },
    [imageList]
  );

  /** remove Image Handler from imageList by Its index */
  const removeImageHanlder = useCallback(
    (index: number) => () => {
      const filtered = imageList?.filter((_, i) => i !== index);
      setImageList(filtered);
    },
    [imageList]
  );

  // to store Selected Place
  const selectPlaceHandler = useCallback(
    (place: PlaceType) => () => {
      setSelectedPlace(place);
    },
    []
  );

  // sumbit data to DataBase Handler
  const submitHandler = useCallback(async () => {
    try {
      if (!selectedPlace) {
        return dispatch(Action.showError('장소를 선택해주세요!'));
      } else if (freeTextError) {
        return dispatch(Action.showError('free comment 에러'));
      }
      const data = {
        userId,
        hasParkingLot,
        hasOffLeash,
        recommendation,
        freeText,
        imageList: imageList ? imageList : null,
        coordinateX: selectedPlace.x,
        coordinateY: selectedPlace.y,
      };

      const response = await createReview(data);
      if (!response.isError) {
      } else {
        return dispatch(Action.showError('잠시후 다시 시도해주세요'));
      }
    } catch (error) {
      console.log(error);
      return dispatch(Action.showError('잠시후 다시 시도해주세요'));
    }
  }, [
    hasParkingLot,
    hasOffLeash,
    recommendation,
    selectedPlace,
    freeText,
    freeTextError,
    imageList,
    selectedPlace,
  ]);

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
    addImageHanlder,
    removeImageHanlder,
    imageInput,
    selectedPlace,
    selectPlaceHandler,
    imageList,
    submitHandler,
  };
};

export default useWritePost;
