import React from 'react';
import colorList from 'util/colorGenerator';
import { sizes } from 'components/ui/Button/style';
import * as S from './style';

export interface Props {
  /** inner Text */
  children: React.ReactNode;
  /** font size*/
  size: 'large' | 'medium' | 'small';
  /** colorRandom or not */
  colorIndex?: number;
}

const Tag = ({ children, size, colorIndex = 0 }: Props): React.ReactElement => {
  return (
    <S.Container color={colorList[colorIndex]} css={sizes[size]}>
      <S.Text>#{children}</S.Text>
    </S.Container>
  );
};

export default Tag;
