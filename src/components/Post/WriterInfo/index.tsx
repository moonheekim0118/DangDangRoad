import React from 'react';
import { Avatar } from 'atoms';
import { userContents } from 'types/API';
import formatDate from 'util/formatDate';
import * as S from './style';

interface Props {
  userData: userContents;
  createdAt: number;
}

const WriterInfo = ({ userData, createdAt }: Props) => {
  return (
    <S.Container>
      <Avatar imageUrl={userData.profilePic} size={'normal'} />
      <S.Info>
        <S.Nickname>{userData.nickname}</S.Nickname>
        <S.TimeStamp>{formatDate(createdAt)}</S.TimeStamp>
      </S.Info>
    </S.Container>
  );
};

export default WriterInfo;
