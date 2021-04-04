import React, { useMemo } from 'react';
import { Avatar } from 'components/UI';
import { User } from 'types/User';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import * as S from './style';

const Icon = dynamic(() => import('components/UI/Icon'));
const DetailsDropdown = dynamic(() => import('components/UI/DetailsDropdown'));

export interface Props {
  /** user data to show */
  userData: User;
  /** comment or Post created at (optional) */
  createdAt?: number;
  /** size of author card */
  size: 'medium' | 'small';
  /** dropdown menu list */
  menuList?: {
    title: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
  }[];
}
const Author = ({
  userData,
  createdAt,
  size,
  menuList,
}: Props): React.ReactElement => {
  const formatDate = useMemo((): string => {
    if (createdAt) {
      let parsedDate = new Date(createdAt);
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth() + 1;
      const day = parsedDate.getDate();

      return `${year}년 ${month}월 ${day}일`;
    }
    return '';
  }, [createdAt]);

  return (
    <S.Container css={S.mainSizes[size]}>
      <Avatar imageUrl={userData.profilePic} size={size} />
      <S.Info css={S.infoSizes[size]}>
        <S.Nickname>{userData.nickname}</S.Nickname>
        {createdAt && (
          <S.TimeStamp css={S.timeSizes[size]}>{formatDate} 작성</S.TimeStamp>
        )}
      </S.Info>
      {menuList && (
        <DetailsDropdown
          menuList={menuList}
          detailStyle={S.detailStyle}
          menuStyle={S.menuStyle}>
          <summary>
            <Icon icon={faEllipsisV} size={size} />
          </summary>
        </DetailsDropdown>
      )}
    </S.Container>
  );
};

export default Author;
