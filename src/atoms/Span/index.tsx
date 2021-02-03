import React, { memo } from 'react';
import { colorCode, colorTypes } from '../../model/colorCode';
import styled from '@emotion/styled';

interface Props {
  /** size of span by rem */
  fontsize: number;
  /** color of span*/
  color: colorTypes;
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
  color: string;
  bold?: boolean;
  cursor?: string;
  margin?: string;
}>`
  font-size: ${(props) => props.fontsize}rem;
  color: ${(props) => colorCode[props.color]};
  font-weight: ${(props) => props.bold && 'bold'};
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};
`;

export default memo(Span);
