import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

type rotationTypes = 0 | 90 | 180 | 270;
interface Props {
  /** icon size */
  size: string;
  /** actual icon */
  icon: FontAwesomeIconProps['icon'];
  /** icon color */
  color: string;
  /** rotate degree */
  rotate?: rotationTypes;
  /** cursor pointer */
  cursor?: string;
  /** onClick event of icon */
  iconClickHandler?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon = ({
  size,
  icon,
  color,
  rotate = 0,
  cursor = '',
  iconClickHandler,
}: Props) => {
  return (
    <StyledIcon
      iconsize={size}
      icon={icon}
      color={color}
      rotate={rotate}
      cursor={cursor}
      onClick={iconClickHandler}
    />
  );
};

const StyledIcon = styled(FontAwesomeIcon)<{
  color: string;
  iconsize: string;
  rotate?: rotationTypes;
  cursor: string;
}>`
  width: ${(props) => props.iconsize}px;
  height: ${(props) => props.iconsize}px;
  color: ${(props) => (props.color === 'blue' ? '#0277bc' : '#fff')};
  transform: rotateY(${(props) => props.rotate}deg);
  cursor: ${(props) => props.cursor};
`;

export default Icon;
