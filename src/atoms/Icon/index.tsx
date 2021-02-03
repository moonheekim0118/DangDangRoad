import React, { memo } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

type rotationTypes = 0 | 90 | 180 | 270;
interface Props {
  /** icon size */
  iconsize: string;
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
  iconsize,
  icon,
  color,
  rotate = 0,
  cursor = '',
  iconClickHandler,
}: Props) => {
  return (
    <StyledIcon
      iconsize={iconsize}
      icon={icon}
      color={color}
      rotate={rotate}
      cursor={cursor}
      onClick={iconClickHandler}
    />
  );
};

const StyledIcon = styled(FontAwesomeIcon)<Props>`
  width: ${(props) => props.iconsize}px;
  height: ${(props) => props.iconsize}px;
  color: ${(props) => (props.color === 'blue' ? '#0277bc' : '#fff')};
  transform: rotateY(${(props) => props.rotate}deg);
  cursor: ${(props) => props.cursor};
`;

export default memo(Icon);
