import React, { useEffect, useRef, useCallback } from 'react';
import { saveBtnStyle } from 'common/style/baseStyle';
import { Button, Input } from 'atoms';
import { inputId } from 'common/constant/input';
import { UserType, MutateType } from 'types/User';
import { SAVE_CAPTION, UPDATE_MESSAGE } from 'common/constant/string';
import { ContentsContainer } from '../style';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { useNotificationDispatch } from 'context/Notification';
import { UserContents } from 'types/API';
import { RefType, defaultRef, InputRef, inputDefaultRef } from 'types/Ref';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { ProfilePicUpload } from 'components/mypage';
import { updateProfile } from 'api/user';
import * as Action from 'action';

interface Props {
  /** user data */
  user: UserType;
  /** mutate function to mutate User's data when it's changed */
  mutate: MutateType;
}

const UpdateProfile = ({ user, mutate }: Props): React.ReactElement => {
  const dispatch = useNotificationDispatch();
  const nicknameRef = useRef<InputRef>(inputDefaultRef(user.nickname));
  const imageUrlRef = useRef<RefType<string[]>>(
    defaultRef<string[]>([user.profilePic])
  );
  const [
    updateProfileResult,
    updateProfileDispatch,
    setDefaultProfile,
  ] = useApiFetch<UserContents>(updateProfile);

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
      const { value: imageUrl } = imageUrlRef.current;
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
    [imageUrlRef, nicknameRef]
  );

  return (
    <ContentsContainer>
      <div>
        <ProfilePicUpload initImageUrl={user.profilePic} ref={imageUrlRef} />
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
