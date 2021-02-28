import { useCallback, useState } from 'react';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { useValidation, useImageInput } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { UserType, MutateType } from 'types/user';
import api from 'api';
import * as Action from 'action';

interface Props {
  user: UserType;
  mutate: MutateType;
}

/** update profile logics  */
const useUpdateProfile = ({ user, mutate }: Props) => {
  const dispatch = useNotificationDispatch();
  /** Image Input Ref */
  const [imageInput, uploaderClickHanlder] = useImageInput();

  /** Image url */
  const [imageUrl, setImageUrl] = useState<string>(user.profilePic);

  /** nickname */
  const {
    value: nickname,
    error: nicknameError,
    valueChangeHanlder: nicknameChangeHandler,
  } = useValidation({
    initialValue: user.nickname,
    characterCheck: nicknameValidatorForUpdate,
  });

  /** Upload Image Handler */
  const uploadImageHanlder = useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      const response = await api.uploadProfileImage(file);
      if (!response.isError) {
        setImageUrl(response.data);
      } else {
        return dispatch(Action.showError(response.error));
      }
    } catch (error) {
      dispatch(Action.showError('잠시후 다시 시도해주세요'));
    }
  }, []);

  /** sumbit save */
  const saveHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        const trimedNickname = nickname.trim();
        const ImageChanged = imageUrl !== user.profilePic;
        const NicknameChanged =
          trimedNickname.length > 0 && trimedNickname !== user.nickname;
        // if url and nickname were not changed ,(not send request)
        if (!ImageChanged && !NicknameChanged) return;
        let updateContents = {
          profilePic: imageUrl,
          nickname: trimedNickname,
        };
        const response = await api.updateProfile({
          id: user.userId,
          updateContents,
        });
        if (!response.isError) {
          // mutation without revalidation
          await mutate({ ...user, ...updateContents }, false);
          return dispatch(Action.showNoti('수정 되었습니다'));
        } else {
          return dispatch(
            Action.showError(response.error || '잠시후 다시 시도해주세요')
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
    nicknameChangeHandler,
    imageInput,
    uploaderClickHanlder,
    imageUrl,
    uploadImageHanlder,
    saveHandler,
  };
};

export default useUpdateProfile;
