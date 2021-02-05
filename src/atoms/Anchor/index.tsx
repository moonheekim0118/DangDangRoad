import React, { memo } from 'react';
import Link from 'next/Link';
import { colorCode, colorTypes } from '../../model/colorCode';
import styled from '@emotion/styled';

interface Props {
  /** font size */
  fontsize: number;
  /** color of anchor element */
  color: colorTypes;
  /** optional hover color of element */
  hoverColor?: colorTypes;
  /** optional margin of element */
  margin?: string;
  /** text of element */
  children: React.ReactNode;
  /** href */
  path: string;
}

const Anchor = ({
  fontsize,
  color,
  hoverColor,
  margin,
  children,
  path,
}: Props) => {
  return (
    <Link href={path}>
      <Title
        fontsize={fontsize}
        color={color}
        hoverColor={hoverColor}
        margin={margin}>
        {children}
      </Title>
    </Link>
  );
};

const Title = styled.a<{
  color: string;
  fontsize: number;
  hoverColor?: string;
  margin?: string;
}>`
  display: block;
  width: 100%;
  color: ${(props) => colorCode[props.color]};
  font-size: ${(props) => props.fontsize}rem;
  font-weight: bold;
  margin: ${(props) => props.margin};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.hoverColor && colorCode[props.hoverColor]};
  }
`;

export default memo(Anchor);
