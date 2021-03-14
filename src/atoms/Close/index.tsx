import React from 'react';
import { Icon } from 'atoms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

interface Props {
  /** close Button size */
  size?: 'large' | 'medium' | 'small';
  /** close Button onClick function */
  onClick: () => void;
}

const Close = ({ size = 'medium', onClick }: Props) => {
  return (
    <Icon icon={faTimes} style={S.iconStyle} size={size} onClick={onClick} />
  );
};

export default Close;
