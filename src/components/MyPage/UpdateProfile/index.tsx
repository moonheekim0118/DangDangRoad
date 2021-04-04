import React, { useEffect, useRef, useCallback } from 'react';
import { Button, Input } from 'components/UI';
import { inputId } from 'common/constant/input';
import { User, UserInfo, MutateType } from 'types/User';
import { SAVE_CAPTION, UPDATE_MESSAGE } from 'common/constant/string';
import { nicknameValidatorForUpdate } from 'util/signUpValidations';
import { useNotificationDispatch } from 'context/Notification';
import { RefType, defaultRef, InputRef, inputDefaultRef } from 'types/Ref';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { ProfilePicUpload } from 'components/MyPage';
import { updateProfile } from 'api/user';
import Form from '../style';
import * as Action from 'action';

interface Props {
  /** user data */
  user: UserInfo;
  /** mutate function to mutate User's data when it's changed */
  mutate: MutateType;
}

const UpdateProfile = ({ user, mutate }: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const nicknameRef = useRef<InputRef>(inputDefaultRef(user.nickname));
  const imageUrlRef = useRef<RefType<string[]>>(
    defaultRef<string[]>([user.profilePic])
  );
  const [
    updateProfileResult,
    updateProfileFetch,
    updateProfileSetDefault,
  ] = useApiFetch<User>(updateProfile);

  useEffect(() => {
    switch (updateProfileResult.type) {
      case SUCCESS:
        mutate({ ...user, ...updateProfileResult.data }, false).then(() => {
          notiDispatch(Action.showSuccess(UPDATE_MESSAGE));
          updateProfileSetDefault();
        });
        break;
      case FAILURE:
        notiDispatch(Action.showError(updateProfileResult.error));
    }
  }, [updateProfileResult]);

  /** sumbit save */
  const saveHandler = useCallback((e: React.MouseEvent<HTMLFormElement>) => {
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
    updateProfileFetch({ type: REQUEST, params: [data] });
  }, []);

  return (
    <Form onSubmit={saveHandler}>
      <div>
        <ProfilePicUpload initImageUrl={user.profilePic} ref={imageUrlRef} />
      </div>
      <Input
        type="text"
        id={inputId.NICKNAME}
        required={true}
        ref={nicknameRef}
        validator={nicknameValidatorForUpdate}
        initValue={user.nickname}
      />
      <Button type="submit" theme="primary" size="large" width="100%">
        {SAVE_CAPTION}
      </Button>
    </Form>
  );
};

export default UpdateProfile;
