import React from 'react';
import Loading from 'components/Loading';
import Avatar from 'atoms/Avatar';
import Button from 'atoms/Button';
import Input from 'atoms/Input';
import Icon from 'atoms/Icon';
import { inputId } from 'types/inputIds';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

/**
 * 닉네임 수정 가능
 * 아바타 수정 가능
 */

interface Props {
  userInfo: {
    nickname: string;
    profilePic: string;
  };
}
const UpdateProfile = ({ userInfo }: Props) => {
  function temp() {}
  return userInfo ? (
    <ProfileContainer>
      <div>
        <AvatarEditor />
        <IconContainer>
          <Icon iconsize={45} icon={faPlus} color="white" cursor="pointer" />
        </IconContainer>
        <Avatar imgUrl={userInfo.profilePic} size="large" />
      </div>
      <Input
        type="text"
        id={inputId.NICKNAME}
        required={true}
        value={userInfo.nickname}
        inputChangeHandler={temp}
      />
      <Button color="blue" hoverColor="light-blue" type="button">
        SAVE
      </Button>
    </ProfileContainer>
  ) : (
    <Loading />
  );
};

const ProfileContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
