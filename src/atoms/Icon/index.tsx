import React, { memo } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';

type rotationTypes = 0 | 90 | 180 | 270;

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

// const StyledIcon = styled(FontAwesomeIcon)<Props>`
//   width:1rem;
//   height:1rem;
//   color:inherit;
//   width: ${(props) => props.iconsize}px;
//   height: ${(props) => props.iconsize}px;
//   color: ${(props) => (props.color ? colorCode[props.color] : 'inherit')};
//   transform: rotateY(${(props) => props.rotate}deg);
//   cursor: ${(props) => props.cursor};
// `;

export default memo(Icon);
