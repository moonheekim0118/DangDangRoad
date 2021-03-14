import React from 'react';
import { Icon } from 'atoms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

export interface Props {
  /** close Button size */
  size?: 'large' | 'medium' | 'small';
  /** close Button onClick function */
  onClick: () => void;
}

const Close = ({ size = 'large', onClick }: Props) => {
  return (
    <S.Container>
      <Icon icon={faTimes} style={S.iconStyle} size={size} onClick={onClick} />
    </S.Container>
  );
};

export default Close;
