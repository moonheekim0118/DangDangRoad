import React, { memo } from 'react';
import { colorCode, ColorType } from 'types/Color';
import styled from '@emotion/styled';

interface Props {
  /** size of span by rem */
  fontsize: number;
  /** color of span if theres no color, it will be inherited*/
  color?: ColorType;
  /** color of hover effects */
  hoverColor?: ColorType;
  /** true = font-weight:bold  */
  bold?: boolean;
  /** contents of span*/
  children: React.ReactNode;
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
  children,
  cursor,
  margin,
  spanClickHandler,
}: Props): React.ReactElement => {
  return (
    <StyledSpan
      fontsize={fontsize}
      color={color}
      hoverColor={hoverColor}
      bold={bold}
      cursor={cursor}
      margin={margin}
      onClick={spanClickHandler}>
      {children}
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
