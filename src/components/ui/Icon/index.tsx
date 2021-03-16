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
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon = ({ icon, style, size, onClick }: Props): React.ReactElement => {
  return (
    <S.Component icon={icon} css={[S.sizes[size], style]} onClick={onClick} />
  );
};

export default memo(Icon);
