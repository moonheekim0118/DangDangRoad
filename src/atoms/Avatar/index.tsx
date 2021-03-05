import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Icon } from 'atoms';
import { colorCode } from 'common/style/color';
import { faUser } from '@fortawesome/free-regular-svg-icons';

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
    <StyledAvatar src={imageUrl} size={size} />
  ) : (
    <Container size={size}>
      <Icon icon={faUser} className="userIcon" css={iconStyle} />
    </Container>
  );
};

const iconStyle = css`
  width: 50%;
  height: 50%;
  color: #fff;
`;

const Container = styled.div<Props>`
  background-color: ${colorCode['dark-gray']};
  width: ${(props) => AvatarSize[props.size]}px;
  height: ${(props) => AvatarSize[props.size]}px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledAvatar = styled.img<Props>`
  width: ${(props) => AvatarSize[props.size]}px;
  height: ${(props) => AvatarSize[props.size]}px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Avatar;
