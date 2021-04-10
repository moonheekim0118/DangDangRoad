import React from 'react';
import * as S from './style';

export interface Props {
  color?: 'gray' | 'blue';
  size?: 'large' | 'medium' | 'small';
}

const Loading = ({
  color = 'blue',
  size = 'large',
}: Props): React.ReactElement => {
  return (
    <S.Container>
      <S.Loader
        color={
          color === 'blue' ? 'var(--colors-blue)' : 'var(--colors-dark-gray)'
        }
        size={size}
      />
    </S.Container>
  );
};

export default Loading;
