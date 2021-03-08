import React, { memo } from 'react';
import Link from 'next/Link';
import * as S from './style';

interface Props {
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
