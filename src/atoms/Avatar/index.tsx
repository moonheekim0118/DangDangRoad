import React from 'react';
import { Icon } from 'atoms';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import * as S from './style';

enum AvatarSize {
  'small' = 40,
  'normal' = 65,
  'large' = 120,
}

interface Props {
  /** image url for Avatar */
  imageUrl?: string;
  /** size of Avatar */
  size: 'small' | 'normal' | 'large';
}

const Avatar = ({
  imageUrl = '',
  size = 'normal',
}: Props): React.ReactElement => {
  return imageUrl ? (
    <S.StyledAvatar src={imageUrl} size={AvatarSize[size]} />
  ) : (
    <S.Container size={AvatarSize[size]}>
      <Icon icon={faUser} className="userIcon" css={S.iconStyle} />
    </S.Container>
  );
};

export default Avatar;
