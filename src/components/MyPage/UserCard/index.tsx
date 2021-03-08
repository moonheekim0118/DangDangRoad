import React from 'react';
import { Avatar } from 'atoms';
import * as S from './style';

interface Props {
  userName: string;
  userEmail: string;
  userImgUrl?: string;
}

const UserCard = ({
  userName,
  userEmail,
  userImgUrl,
}: Props): React.ReactElement => {
  return (
    <S.Container>
      <Avatar imageUrl={userImgUrl} size="normal" />
      <S.Name>{userName}</S.Name>
      <S.Email>{userEmail}</S.Email>
    </S.Container>
  );
};
export default UserCard;
