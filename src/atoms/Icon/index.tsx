import React, { memo } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

interface Props {
  /** actual icon */
  icon: FontAwesomeIconProps['icon'];
  /** className */
  className?: string;
  /** onClick event of icon */
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon = ({ icon, className, onClick }: Props): React.ReactElement => {
  return <Component icon={icon} className={className} onClick={onClick} />;
};

const Component = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  color: inherit;
`;

export default memo(Icon);
