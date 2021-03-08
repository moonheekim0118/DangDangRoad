import React from 'react';
import { saveBtnStyle } from 'common/style/baseStyle';
import { useUpdateProfile } from 'hooks';
import { Avatar, Button, Input, Icon } from 'atoms';
import { inputId } from 'common/constant/input';
import { UserType, MutateType } from 'types/User';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SAVE_CAPTION } from 'common/constant/string';
import { ContentsContainer } from '../style';
import * as S from './style';

interface Props {
  /** user data */
  user: UserType;
  /** mutate function to mutate User's data when it's changed */
  mutate: MutateType;
}

const UpdateProfile = ({ user, mutate }: Props): React.ReactElement => {
  const data = useUpdateProfile({ user, mutate });

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
            ref={data.imageInput}
            onChange={data.uploadImageHanlder('new')}
          />
          <Icon
            icon={faPlus}
            className="uploadIcon"
            css={S.iconStyle}
            onClick={data.uploaderClickHanlder}
          />
        </S.IconContainer>
        <Avatar imageUrl={data.imageUrl[0]} size="large" />
      </div>
      <Input
        type="text"
        id={inputId.NICKNAME}
        error={data.nicknameError}
        required={true}
        value={data.nickname}
        onChange={data.nicknameChangeHandler}
      />
      <Button
        className="saveBtn"
        css={saveBtnStyle}
        type="submit"
        onClick={data.saveHandler}>
        {SAVE_CAPTION}
      </Button>
    </ContentsContainer>
  );
};

export default UpdateProfile;
