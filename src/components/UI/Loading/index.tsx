import React from 'react';
import { colorType } from 'common/style/color';
import * as S from './style';

export interface Props {
  color?: colorType;
  size?: 'large' | 'medium' | 'small';
}

const Loading = ({
  color = 'blue',
  size = 'large',
}: Props): React.ReactElement => {
  return (
    <S.Container>
      <S.Loader color={color} size={size} />
    </S.Container>
  );
};

export default Loading;
