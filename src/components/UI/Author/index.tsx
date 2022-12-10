import { Avatar } from 'components/UI';
import { User } from 'types/User';
import formatDate from 'util/formatDate';
import * as S from './style';

export interface Props {
  /** user data to show */
  userData: User;
  /** comment or Post created at (optional) */
  createdAt?: number;
  /** size of author card */
  size: 'medium' | 'small';
  /** children */
  children?: React.ReactElement;
}
const Author = ({
  userData,
  createdAt,
  size,
  children,
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
      {children}
    </S.Container>
  );
};

export default Author;
