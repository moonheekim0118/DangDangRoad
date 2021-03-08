import React from 'react';
import colorList from 'util/colorGenerator';
import * as S from './style';

enum fontSize {
  'normal' = 1,
  'large' = 1.5,
}

interface Props {
  /** inner Text */
  children: React.ReactNode;
  /** font size*/
  size: 'normal' | 'large';
  /** colorRandom or not */
  colorIndex?: number;
}

const Tag = ({ children, size, colorIndex = 0 }: Props) => {
  return (
    <S.Container color={colorList[colorIndex]} fontSize={fontSize[size]}>
      #{children}
    </S.Container>
  );
};

export default Tag;
