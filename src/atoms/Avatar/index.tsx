import React from 'react';
import styled from '@emotion/styled';
import Icon from 'atoms/Icon';
import { colorCode } from 'types/Color';
import { faUser } from '@fortawesome/free-regular-svg-icons';

enum AvatarSize {
  'small' = 40,
  'normal' = 65,
  'large' = 120,
}

interface Props {
  /** image url for Avatar */
  imgUrl?: string;
  /** size of Avatar */
  size: 'small' | 'normal' | 'large';
}

const Avatar = ({ imgUrl = '', size = 'normal' }: Props) => {
  return imgUrl ? (
    <StyledAvatar src={imgUrl} size={size} />
  ) : (
    <Container size={size}>
      <Icon iconsize={AvatarSize[size] - 25} icon={faUser} color="white" />
    </Container>
  );
};

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
