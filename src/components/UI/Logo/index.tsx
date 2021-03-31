import React, { memo } from 'react';
import Link from 'next/link';
import * as S from './style';

export interface Props {
  color: 'blue' | 'white';
}

const Logo = ({ color }: Props): React.ReactElement => {
  return (
    <Link href="/">
      <S.Title color={color}>댕댕로드🐶</S.Title>
    </Link>
  );
};
export default memo(Logo);
