import React from 'react';
import { Avatar } from 'atoms';
import { UserContents } from 'types/API';
import formatDate from 'util/formatDate';
import * as S from './style';

interface Props {
  userData: UserContents;
  createdAt: number;
}

const WriterInfo = ({ userData, createdAt }: Props) => {
  return (
    <S.Container>
      <Avatar imageUrl={userData.profilePic} size="medium" />
      <S.Info>
        <S.Nickname>{userData.nickname}</S.Nickname>
        <S.TimeStamp>{formatDate(createdAt)}</S.TimeStamp>
      </S.Info>
    </S.Container>
  );
};

export default WriterInfo;
