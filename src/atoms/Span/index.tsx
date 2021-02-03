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
  /** click handler function */
  spanClickHandler?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Span = ({
  fontsize,
  color,
  bold,
  title,
  cursor,
  spanClickHandler,
}: Props) => {
  return (
    <StyledSpan
      fontsize={fontsize}
      color={color}
      bold={bold}
      cursor={cursor}
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
}>`
  font-size: ${(props) => props.fontsize}rem;
  color: ${(props) => colorCode[props.color]};
  font-weight: ${(props) => props.bold && 'bold'};
  cursor: ${(props) => props.cursor};
`;

export default memo(Span);
