import React from 'react';
import { colorType } from 'common/style/color';
import * as S from './style';

enum LoaderSize {
  'small' = 15,
  'normal' = 30,
  'large' = 64,
}

enum LoaderBorderSize {
  'small' = 3,
  'normal' = 4,
  'large' = 6,
}

interface Props {
  color?: colorType;
  size?: 'large' | 'normal' | 'small';
}

const Loading = ({
  color = 'blue',
  size = 'large',
}: Props): React.ReactElement => {
  return (
    <S.Loader
      color={color}
      size={LoaderSize[size]}
      borderSize={LoaderBorderSize[size]}
    />
  );
};

export default Loading;
