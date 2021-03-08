import React, { memo } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as S from './style';

interface Props {
  /** actual icon */
  icon: FontAwesomeIconProps['icon'];
  /** className */
  className?: string;
  /** onClick event of icon */
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon = ({ icon, className, onClick }: Props): React.ReactElement => {
  return <S.Component icon={icon} className={className} onClick={onClick} />;
};

export default memo(Icon);
