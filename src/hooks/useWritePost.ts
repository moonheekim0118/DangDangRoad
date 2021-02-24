import { useState, useCallback, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { uploadPostImage } from 'api/storage';
import { useInput, useValidation } from 'hooks';
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
  const imageInput = useRef<HTMLInputElement>(null);

  /** image Url */
  const [imageList, setImageList] = useState<string[] | undefined>();

  /** Image Input onClick Handler */
  const ClickImageUploadHandler = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  const UploadImageHanlder = useCallback(async (e) => {
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
    // 이미지 핸들러 추가 필요
    // 추후에..image List 에 2개 이하 업로드했을 때
    // 나머지 올릴 수 있는 것..필요
  }, []);

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
    ClickImageUploadHandler,
    UploadImageHanlder,
    imageInput,
    selectedPlace,
    selectPlaceHandler,
    imageList,
  };
};

export default useWritePost;
