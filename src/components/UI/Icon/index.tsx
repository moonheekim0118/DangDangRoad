import React, { memo } from 'react';
import { SerializedStyles } from '@emotion/react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as S from './style';

export interface Props {
  /** actual icon */
  icon: FontAwesomeIconProps['icon'];
  /** style of icon */
  style?: SerializedStyles;
  /** size of icon */
  size: 'large' | 'medium' | 'small';
  /** onClick event of icon */
  onClick?: (e: React.MouseEvent) => void;
}

const Icon = ({ icon, style, size, onClick }: Props): React.ReactElement => {
  return onClick ? (
    <S.ButtonComponent onClick={onClick} css={S.sizes[size]}>
      <S.Component icon={icon} css={[style, S.sizes[size]]} />
    </S.ButtonComponent>
  ) : (
    <S.Component icon={icon} css={[S.sizes[size], style]} />
  );
};

export default memo(Icon);
