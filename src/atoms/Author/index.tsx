import React from 'react';
import { Avatar } from 'atoms';
import { UserContents } from 'types/API';
import formatDate from 'util/formatDate';
import * as S from './style';

export interface Props {
  /** user data to show */
  userData: UserContents;
  /** comment or Post created at (optional) */
  createdAt?: number;
  /** size of author card */
  size: 'medium' | 'small';
}

const Author = ({ userData, createdAt, size }: Props) => {
  return (
    <S.Container css={S.mainSizes[size]}>
      <Avatar imageUrl={userData.profilePic} size={size} />
      <S.Info css={S.infoSizes[size]}>
        <S.Nickname>{userData.nickname}</S.Nickname>
        {createdAt && <S.TimeStamp>{formatDate(createdAt)}</S.TimeStamp>}
      </S.Info>
    </S.Container>
  );
};

export default Author;
