import { useState, useCallback, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { uploadPostImage } from 'api/storage';
import { useInput, useValidation, useImageInput } from 'hooks';
import { PlaceType } from 'types/Map';
import * as Action from 'action';

const freeTextLengthCheck = (value) => {
  return value.length <= 100;
};

const useWritePost = () => {
  const dispatch = useNotificationDispatch();

  /** has Parking lot Radio value*/
  const [hasParkingLot, hasParkingLotHandler] = useInput();
  /** off leash Avalibale Raido value */
  const [hasOffLeash, hasOffLeashHandler] = useInput();
  /** Recommenation Radio value*/
  const [recommendation, recommendationHandler] = useInput();
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

  // to store Selected Place
  const selectPlaceHandler = useCallback(
    (place: PlaceType) => () => {
      setSelectedPlace(place);
    },
    []
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
    addImageHanlder,
    imageInput,
    selectedPlace,
    selectPlaceHandler,
    imageList,
  };
};

export default useWritePost;
