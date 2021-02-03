import React, { memo } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { colorCode, colorTypes } from '../../model/colorCode';
import styled from '@emotion/styled';

type rotationTypes = 0 | 90 | 180 | 270;
interface Props {
  /** icon size */
  iconsize: number;
  /** actual icon */
  icon: FontAwesomeIconProps['icon'];
  /** icon color */
  color: colorTypes;
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
  rotate,
  cursor,
  iconClickHandler,
}: Props) => {
  return (
    <StyledIcon
      icon={icon}
      iconsize={iconsize}
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
  color: ${(props) => colorCode[props.color]};
  transform: rotateY(${(props) => props.rotate}deg);
  cursor: ${(props) => props.cursor};
`;

export default memo(Icon);
