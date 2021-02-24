import { useState, useCallback, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { useInput, useValidation } from 'hooks';
import { PlaceType } from 'types/Map';

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

  /** Image Input onClick Handler */
  const ClickImageUploadHandler = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  const UploadImageHanlder = useCallback((e) => {
    const files = e.target.files;
    /** can upload 3 image file */
    if (files.length > 3) {
      return dispatch(showError('이미지는 최대 3장까지 업로드 가능합니다.'));
    }
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
  };
};

export default useWritePost;
