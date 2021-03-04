import { useEffect, useCallback } from 'react';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { useValidation, useImageUpload } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { UserType, MutateType } from 'types/User';
import { userContents } from 'types/API';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { updateProfile } from 'api/user';
import { UPDATE_MESSAGE } from 'common/constant/string';
import * as Action from 'action';

interface Props {
  user: UserType;
  mutate: MutateType;
}

/** update profile logics  */
const useUpdateProfile = ({ user, mutate }: Props) => {
  const dispatch = useNotificationDispatch();
  const [
    updateProfileResult,
    updateProfileDispatch,
    setDefaultProfile,
  ] = useApiFetch<userContents>(updateProfile);
  const [
    imageInput,
    imageUrl,
    uploaderClickHanlder,
    uploadImageHanlder,
    removeImageHanlder,
  ] = useImageUpload({
    initialImages: user.profilePic ? [user.profilePic] : [],
    imageLimit: 1,
    dispatch,
  });

  /** nickname */
  const {
    value: nickname,
    error: nicknameError,
    valueChangeHanlder: nicknameChangeHandler,
  } = useValidation({
    initialValue: user.nickname,
    characterCheck: nicknameValidatorForUpdate,
  });

  useEffect(() => {
    switch (updateProfileResult.type) {
      case SUCCESS:
        mutate({ ...user, ...updateProfileResult.data }, false).then(() => {
          dispatch(Action.showNoti(UPDATE_MESSAGE));
          setDefaultProfile();
        });
        break;
      case FAILURE:
        dispatch(Action.showError(updateProfileResult.error));
    }
  }, [updateProfileResult]);

  /** sumbit save */
  const saveHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const trimedNickname = nickname.trim();
      const ImageChanged = imageUrl[0] !== user.profilePic;
      const NicknameChanged =
        trimedNickname.length > 0 && trimedNickname !== user.nickname;
      // if url and nickname were not changed ,(not send request)
      if (!ImageChanged && !NicknameChanged) return;
      let updateContents = {
        profilePic: imageUrl[0],
        nickname: trimedNickname,
      };
      const data = { id: user.userId, updateContents };
      updateProfileDispatch({ type: REQUEST, params: [data] });
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
