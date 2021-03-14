import React, { memo } from 'react';
import { SerializedStyles } from '@emotion/react';
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';
import * as S from './style';

interface Props {
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
    <FontAwesomeIcon
      icon={icon}
      css={[S.baseStyle, S.sizes[size], style]}
      onClick={onClick}
    />
  );
};

export default memo(Icon);
