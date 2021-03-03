import React, { memo } from 'react';
import Link from 'next/Link';
import { colorCode, colorType } from 'common/style/color';
import styled from '@emotion/styled';

interface Props {
  /** font size */
  fontsize?: number;
  /** color of anchor element */
  color?: colorType;
  /** font weight */
  fontbold?: boolean;
  /** optional hover color of element */
  hoverColor?: colorType;
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
  fontbold = true,
  hoverColor,
  margin,
  children,
  path,
}: Props): React.ReactElement => {
  return (
    <Link href={path}>
      <Title
        fontsize={fontsize}
        color={color}
        fontbold={fontbold}
        hoverColor={hoverColor}
        margin={margin}>
        {children}
      </Title>
    </Link>
  );
};

const Title = styled.a<{
  color?: string;
  fontsize?: number;
  fontbold?: boolean;
  hoverColor?: string;
  margin?: string;
}>`
  display: inline;
  color: ${(props) => (props.color ? colorCode[props.color] : 'inherit')};
  font-size: ${(props) =>
    props.fontsize ? `${props.fontsize}rem` : 'inherit'};
  font-weight: ${(props) => props.fontbold && 'bold'};
  margin: ${(props) => props.margin};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.hoverColor && colorCode[props.hoverColor]};
  }
`;

export default memo(Anchor);
