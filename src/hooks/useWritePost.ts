import { useCallback, useRef } from 'react';
import { useNotificationDispatch } from 'context/Notification';
import { useInput, useValidation } from 'hooks';

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
      return dispatch({
        type: 'show',
        data: {
          notiType: 'error',
          message: '이미지는 최대 3장까지 업로드 가능합니다.',
        },
      });
    }
  }, []);

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
  };
};

export default useWritePost;
