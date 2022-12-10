import { useEffect, useRef } from 'react';
import { Button, Input } from 'components/UI';
import { inputId } from 'common/constant/input';
import { User, UserInfo, MutateType } from 'types/User';
import { SAVE_CAPTION, UPDATE_MESSAGE } from 'common/constant/string';
import { nicknameValidatorForUpdate } from 'util/validations';
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
  const [result, dispatch, setDefault] = useApiFetch<User>(updateProfile);

  useEffect(() => {
    switch (result.type) {
      case SUCCESS:
        mutate({ ...user, ...result.data }, false).then(() => {
          notiDispatch(Action.showSuccess(UPDATE_MESSAGE));
          setDefault();
        });
        return;
      case FAILURE:
        notiDispatch(Action.showError(result.error));
        return;
    }
  }, [result]);

  /** sumbit save */
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
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
    dispatch({ type: REQUEST, params: [data] });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
