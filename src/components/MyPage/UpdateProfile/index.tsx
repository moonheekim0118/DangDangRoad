import React from 'react';
import Loading from 'components/Loading';
import Avatar from 'atoms/Avatar';
import Button from 'atoms/Button';
import Input from 'atoms/Input';
import Icon from 'atoms/Icon';
import Alert from 'atoms/Alert';
import useUpdaetProfile from 'hooks/useUpdateProfile';
import { inputId } from 'types/Input';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import * as S from '../style';

const UpdateProfile = () => {
  const [
    user,
    nickname,
    nicknameError,
    NicknameChangeHandler,
    imageInput,
    ClickImageUploadHandler,
    imageUrl,
    UploadImageHanlder,
    alertType,
    SaveHandler,
  ] = useUpdaetProfile();

  return user ? (
    <S.ContentsContainer>
      {alertType !== '' && (
        <S.AlertContainer>
          {alertType === 'noti' ? (
            <Alert type={alertType}>수정되었습니다.</Alert>
          ) : (
            <Alert type={alertType}>잠시후 다시 시도해주세요.</Alert>
          )}
        </S.AlertContainer>
      )}
      <div>
        <AvatarEditor />
        <IconContainer>
          <input
            type="file"
            multiple
            name="image"
            hidden
            ref={imageInput}
            onChange={UploadImageHanlder}
          />
          <Icon
            iconsize={45}
            icon={faPlus}
            color="white"
            cursor="pointer"
            iconClickHandler={ClickImageUploadHandler}
          />
        </IconContainer>
        <Avatar imgUrl={imageUrl} size="large" />
      </div>
      <Input
        type="text"
        id={inputId.NICKNAME}
        error={nicknameError}
        required={true}
        value={nickname}
        inputChangeHandler={NicknameChangeHandler}
      />
      <Button
        color="blue"
        hoverColor="light-blue"
        type="submit"
        onClick={SaveHandler}>
        SAVE
      </Button>
    </S.ContentsContainer>
  ) : (
    <Loading />
  );
};

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
