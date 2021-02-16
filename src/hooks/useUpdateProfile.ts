import { useEffect, useCallback, useState, useRef } from 'react';
import { nicknameValidator } from 'util/signUpValidations';
import { uploadImage } from 'api/storage';
import useValidation from './useValidation';

const useUpdateProfile = () => {
  // Image Input Ref
  const imageInput = useRef<HTMLInputElement>(null);

  // Image File
  const [imageUrl, setImageUrl] = useState<string | undefined>(); // 기본값은..원래 유저 profilePic 값으로 수정하깅

  // Nickname Input
  const [nickname, nicknameError, NicknameChangeHandler] = useValidation({
    characterCheck: nicknameValidator,
  });

  // Image Input onClick Handler
  const ClickImageUploadHandler = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  // Upload Image Handler
  const UploadImageHanlder = useCallback(async (e) => {
    const file = e.target.files[0];
    const response = await uploadImage(file);
    if (!response.isError) {
      setImageUrl(response.url);
    } else {
      // 에러처리
    }
  }, []);

  return [
    nickname,
    nicknameError,
    NicknameChangeHandler,
    imageInput,
    ClickImageUploadHandler,
    UploadImageHanlder,
  ] as const;
};

export default useUpdateProfile;
