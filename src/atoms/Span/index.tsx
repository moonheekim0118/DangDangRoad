import React, { memo } from 'react';
import { colorCode, colorTypes } from '../../model/colorCode';
import styled from '@emotion/styled';

interface Props {
  /** size of span by rem */
  fontsize: number;
  /** color of span if theres no color, it will be inherited*/
  color?: colorTypes;
  /** color of hover effects */
  hoverColor?: colorTypes;
  /** true = font-weight:bold  */
  bold?: boolean;
  /** contents of span*/
  title: string;
  /** true == cursor pointer */
  cursor?: string;
  /** margin */
  margin?: string;
  /** click handler function */
  spanClickHandler?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Span = ({
  fontsize,
  color,
  hoverColor,
  bold,
  title,
  cursor,
  margin,
  spanClickHandler,
}: Props) => {
  return (
    <StyledSpan
      fontsize={fontsize}
      color={color}
      hoverColor={hoverColor}
      bold={bold}
      cursor={cursor}
      margin={margin}
      onClick={spanClickHandler}>
      {title}
    </StyledSpan>
  );
};

const StyledSpan = styled.span<{
  fontsize: number;
  color?: string;
  hoverColor?: string;
  bold?: boolean;
  cursor?: string;
  margin?: string;
}>`
  font-size: ${(props) => props.fontsize}rem;
  color: ${(props) => (props.color ? colorCode[props.color] : 'inherit')};
  font-weight: ${(props) => props.bold && 'bold'};
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};

  &:hover {
    color: ${(props) => props.hoverColor && colorCode[props.hoverColor]};
  }
`;

export default memo(Span);
