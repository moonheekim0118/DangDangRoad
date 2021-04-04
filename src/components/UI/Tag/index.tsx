import React from 'react';
import { sizes } from 'components/UI/Button/style';
import * as S from './style';

export interface Props {
  /** inner Text */
  children: React.ReactNode;
  /** font size*/
  size: 'large' | 'medium' | 'small';
}

const Tag = ({ children, size }: Props): React.ReactElement => {
  return (
    <S.Container css={sizes[size]}>
      <S.Text>#{children}</S.Text>
    </S.Container>
  );
};

export default Tag;
