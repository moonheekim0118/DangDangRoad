import React from 'react';
import { css } from '@emotion/react';
import { saveBtnStyle } from 'common/style/baseStyle';
import { useUpdateProfile } from 'hooks';
import { Avatar, Button, Input, Icon } from 'atoms';
import { inputId } from 'common/constant/input';
import { UserType, MutateType } from 'types/User';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SAVE_CAPTION } from 'common/constant/string';
import styled from '@emotion/styled';
import * as S from '../style';

interface Props {
  /** user data */
  user: UserType;
  /** mutate function to mutate User's data when it's changed */
  mutate: MutateType;
}

const UpdateProfile = ({ user, mutate }: Props): React.ReactElement => {
  const data = useUpdateProfile({ user, mutate });

  return (
    <S.ContentsContainer>
      <div>
        <AvatarEditor />
        <IconContainer>
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
            css={iconStyle}
            onClick={data.uploaderClickHanlder}
          />
        </IconContainer>
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
    </S.ContentsContainer>
  );
};

const iconStyle = css`
  width: 45px;
  height: 45px;
  color: #fff;
  cursor: pointer;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1600;
  width: 90px;
  height: 90px;
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(244, 244, 244, 0.3);
  }
`;

const AvatarEditor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1500;
`;

export default UpdateProfile;
