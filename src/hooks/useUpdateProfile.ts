import { useEffect, useCallback, useState, useRef } from 'react';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { uploadImage } from 'api/storage';
import { updateProfile } from 'api/user';
import useUser from 'libs/useUser';
import useValidation from './useValidation';

const useUpdateProfile = () => {
  const { user } = useUser();

  // Image Input Ref
  const imageInput = useRef<HTMLInputElement>(null);

  // Image File
  const [imageUrl, setImageUrl] = useState<string | undefined>(); // 기본값은..원래 유저 profilePic 값으로 수정하깅

  // Nickname Input
  const [
    nickname,
    nicknameError,
    NicknameChangeHandler,
    setNicknameError,
    setNickname,
  ] = useValidation({
    characterCheck: nicknameValidatorForUpdate,
  });

  // alert message
  const [alertType, setAlertType] = useState<'error' | 'noti' | ''>('');

  useEffect(() => {
    if (user && user.isLoggedIn) {
      setNickname(user.nickname);
      setImageUrl(user.profilePic);
    }
  }, [user]);

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

  // sumbit save
  const SaveHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        const trimedNickname = nickname.trim();
        const ImageChanged = imageUrl !== user.profilePic;
        const NicknameChanged =
          trimedNickname.length !== 0 && trimedNickname !== user.nickname;
        let updateContets = {};
        // if url and nickname were not changed ,(not send request)
        if (!ImageChanged && !NicknameChanged) return;
        // if only url changed
        else if (ImageChanged && !NicknameChanged) {
          updateContets['profilePic'] = imageUrl;
        }
        // if only nickname changed
        else if (!ImageChanged && NicknameChanged) {
          updateContets['nickname'] = nickname;
        } else {
          // if both of them changed
          updateContets['profilePic'] = imageUrl;
          updateContets['nickname'] = nickname;
        }
        const response = await updateProfile(user.userId, updateContets);
        if (!response.isError) {
          setAlertType('noti');
        } else {
          setAlertType('error');
        }
      } catch (error) {
        setAlertType('error');
      }
    },
    [imageUrl, nickname]
  );

  return [
    user,
    nickname,
    nicknameError,
    NicknameChangeHandler,
    imageInput,
    ClickImageUploadHandler,
    imageUrl,
    UploadImageHanlder,
    alertType,
    SaveHandler,
  ] as const;
};

export default useUpdateProfile;
