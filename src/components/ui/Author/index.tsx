import React from 'react';
import { useCloseDropdown } from 'hooks';
import { Avatar, Icon } from 'components/ui';
import { UserContents } from 'types/API';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import formatDate from 'util/formatDate';
import * as S from './style';

export interface Props {
  /** user data to show */
  userData: UserContents;
  /** comment or Post created at (optional) */
  createdAt?: number;
  /** size of author card */
  size: 'medium' | 'small';
  /** dropdown children for editing post or comment */
  children?: React.ReactNode;
  /** ref for Detail Element */
  detailRef?: React.Ref<HTMLDetailsElement>;
}
const Author = ({
  userData,
  createdAt,
  size,
  children,
  detailRef,
}: Props): React.ReactElement => {
  return (
    <S.Container css={S.mainSizes[size]}>
      <Avatar imageUrl={userData.profilePic} size={size} />
      <S.Info css={S.infoSizes[size]}>
        <S.Nickname>{userData.nickname}</S.Nickname>
        {createdAt && (
          <S.TimeStamp css={S.timeSizes[size]}>
            {formatDate(createdAt)} 작성
          </S.TimeStamp>
        )}
      </S.Info>
      {children && (
        <S.EditDetailsContainer ref={detailRef}>
          <summary>
            <Icon icon={faEllipsisV} size={size} />
          </summary>
          <S.DetailsMenu>{children}</S.DetailsMenu>
        </S.EditDetailsContainer>
      )}
    </S.Container>
  );
};

export default Author;
