import React, { memo } from 'react';
import * as S from './style';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props): React.ReactElement => {
  return <S.Container>{children}</S.Container>;
};

export default memo(Title);
