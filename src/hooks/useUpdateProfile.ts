import { useCallback, useState, useRef } from 'react';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { uploadProfileImage } from 'api/storage';
import { updateProfile } from 'api/user';
import { useValidation } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { UserType, MutateType } from 'types/user';
import * as Action from 'action';

interface Props {
  user: UserType;
  mutate: MutateType;
}

/** update profile logics  */
const useUpdateProfile = ({ user, mutate }: Props) => {
  const dispatch = useNotificationDispatch();

  /** Image Input Ref */
  const imageInput = useRef<HTMLInputElement>(null);

  /** Image url */
  const [imageUrl, setImageUrl] = useState<string>(user.profilePic);

  /** nickname */
  const {
    value: nickname,
    error: nicknameError,
    valueChangeHanlder: NicknameChangeHandler,
  } = useValidation({
    initialValue: user.nickname,
    characterCheck: nicknameValidatorForUpdate,
  });

  /** Image Input onClick Handler */
  const ClickImageUploadHandler = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, []);

  /** Upload Image Handler */
  const UploadImageHanlder = useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      const response = await uploadProfileImage(file);
      if (!response.isError) {
        setImageUrl(response.url);
      } else {
        return dispatch(
          Action.showError(response.errorMessage || '잠시후 다시 시도해주세요')
        );
      }
    } catch (error) {
      dispatch(Action.showError('잠시후 다시 시도해주세요'));
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
          mutate();
          return dispatch(Action.showNoti('수정 되었습니다'));
        } else {
          return dispatch(
            Action.showError(
              response.errorMessage || '잠시후 다시 시도해주세요'
            )
          );
        }
      } catch (error) {
        return dispatch(Action.showError('잠시후 다시 시도해주세요'));
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
    SaveHandler,
  };
};

export default useUpdateProfile;
