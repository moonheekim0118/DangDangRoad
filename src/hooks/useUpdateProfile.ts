import { useEffect, useCallback, useState, useRef } from 'react';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { uploadImage } from 'api/storage';
import { updateProfile } from 'api/user';
import { useLoginInfoState } from 'context/LoginInfo';
import { useAlert, useValidation } from 'hooks';

/** update profile logics  */
const useUpdateProfile = () => {
  const user = useLoginInfoState();

  /** alert controller */
  const {
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    closeAlertHandler,
  } = useAlert();

  /** Image Input Ref */
  const imageInput = useRef<HTMLInputElement>(null);

  /** Image url */
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  /** nickname */
  const {
    value: nickname,
    error: nicknameError,
    valueChangeHanlder: NicknameChangeHandler,
    setValue: setNickname,
  } = useValidation({
    characterCheck: nicknameValidatorForUpdate,
  });

  useEffect(() => {
    if (user.isLoaded && user.isLoggedIn) {
      setNickname(user.nickname);
      setImageUrl(user.profilePic);
    }
  }, [user]);

  /** Image Input onClick Handler */
  const ClickImageUploadHandler = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  /** Upload Image Handler */
  const UploadImageHanlder = useCallback(async (e) => {
    const file = e.target.files[0];
    const response = await uploadImage(file);
    if (!response.isError) {
      setImageUrl(response.url);
    } else {
      setAlertType('error');
      setAlertMessage('잠시후 다시 시도해주세요');
    }
  }, []);

  /** sumbit save */
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
          setAlertMessage('수정되었습니다.');
        } else {
          setAlertType('error');
          setAlertMessage('잠시후 다시 시도해주세요');
        }
      } catch (error) {
        setAlertType('error');
      }
    },
    [imageUrl, nickname]
  );

  return {
    user,
    nickname,
    nicknameError,
    NicknameChangeHandler,
    imageInput,
    ClickImageUploadHandler,
    imageUrl,
    UploadImageHanlder,
    alertMessage,
    alertType,
    closeAlertHandler,
    SaveHandler,
  };
};

export default useUpdateProfile;
