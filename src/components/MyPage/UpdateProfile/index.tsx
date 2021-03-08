import React, { useEffect, useRef, useCallback } from 'react';
import { saveBtnStyle } from 'common/style/baseStyle';
import { Avatar, Button, Input, Icon } from 'atoms';
import { inputId } from 'common/constant/input';
import { UserType, MutateType } from 'types/User';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SAVE_CAPTION, UPDATE_MESSAGE } from 'common/constant/string';
import { ContentsContainer } from '../style';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { useImageUpload } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { userContents } from 'types/API';
import { inputRef, defaultRef } from 'types/Input';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { updateProfile } from 'api/user';
import * as Action from 'action';
import * as S from './style';

interface Props {
  /** user data */
  user: UserType;
  /** mutate function to mutate User's data when it's changed */
  mutate: MutateType;
}

const UpdateProfile = ({ user, mutate }: Props): React.ReactElement => {
  const dispatch = useNotificationDispatch();
  defaultRef.value = user.nickname;
  const nicknameRef = useRef<inputRef>(defaultRef);

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
  ] = useImageUpload({
    initialImages: user.profilePic ? [user.profilePic] : [],
    imageLimit: 1,
    dispatch,
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
      const { value: nickname, error: nickNameError } = nicknameRef.current;
      const trimedNickname = nickname.trim();
      const ImageChanged = imageUrl[0] !== user.profilePic;
      const NicknameChanged =
        trimedNickname.length > 0 && trimedNickname !== user.nickname;

      // if url and nickname were not changed ,(not send request)
      if ((!ImageChanged && !NicknameChanged) || nickNameError) return;

      let updateContents = {
        profilePic: imageUrl[0],
        nickname: trimedNickname,
      };
      const data = { id: user.userId, updateContents };
      updateProfileDispatch({ type: REQUEST, params: [data] });
    },
    [imageUrl, nicknameRef]
  );

  return (
    <ContentsContainer>
      <div>
        <S.AvatarEditor />
        <S.IconContainer>
          <input
            type="file"
            multiple
            name="image"
            hidden
            ref={imageInput}
            onChange={uploadImageHanlder('new')}
          />
          <Icon
            icon={faPlus}
            className="uploadIcon"
            css={S.iconStyle}
            onClick={uploaderClickHanlder}
          />
        </S.IconContainer>
        <Avatar imageUrl={imageUrl[0]} size="large" />
      </div>
      <Input
        type="text"
        id={inputId.NICKNAME}
        required={true}
        ref={nicknameRef}
        validator={nicknameValidatorForUpdate}
      />
      <Button
        className="saveBtn"
        css={saveBtnStyle}
        type="submit"
        onClick={saveHandler}>
        {SAVE_CAPTION}
      </Button>
    </ContentsContainer>
  );
};

export default UpdateProfile;
