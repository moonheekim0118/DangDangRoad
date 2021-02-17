import React from 'react';
import Loading from 'components/Loading';
import { useUpdateProfile } from 'hooks';
import { Avatar, Button, Input, Icon, Alert } from 'atoms';
import { inputId } from 'types/Input';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import * as S from '../style';

const UpdateProfile = (): React.ReactElement => {
  const data = useUpdateProfile();

  return data.user ? (
    <S.ContentsContainer>
      {data.alertMessage !== '' && (
        <Alert type={data.alertType} closeAlertHandler={data.closeAlertHandler}>
          {data.alertMessage}
        </Alert>
      )}
      <div>
        <AvatarEditor />
        <IconContainer>
          <input
            type="file"
            multiple
            name="image"
            hidden
            ref={data.imageInput}
            onChange={data.UploadImageHanlder}
          />
          <Icon
            iconsize={45}
            icon={faPlus}
            color="white"
            cursor="pointer"
            iconClickHandler={data.ClickImageUploadHandler}
          />
        </IconContainer>
        <Avatar imgUrl={data.imageUrl} size="large" />
      </div>
      <Input
        type="text"
        id={inputId.NICKNAME}
        error={data.nicknameError}
        required={true}
        value={data.nickname}
        inputChangeHandler={data.NicknameChangeHandler}
      />
      <Button
        color="blue"
        hoverColor="light-blue"
        type="submit"
        onClick={data.SaveHandler}>
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
