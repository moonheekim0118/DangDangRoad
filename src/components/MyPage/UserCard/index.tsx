import React from 'react';
import { Avatar } from 'components/ui';
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
      <Avatar imageUrl={userImgUrl} size="medium" />
      <S.Name>{userName}</S.Name>
      <S.Email>{userEmail}</S.Email>
    </S.Container>
  );
};
export default UserCard;
