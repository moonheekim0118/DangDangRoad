import React from 'react';
import Link from 'next/Link';
import { colorCode, colorTypes } from '../../model/colorCode';
import styled from '@emotion/styled';

interface Props {
  fontsize: number;
  color: colorTypes;
  hoverColor?: colorTypes;
  margin?: string;
  title: string;
  path: string;
}

const Anchor = ({
  fontsize,
  color,
  hoverColor,
  margin,
  title,
  path,
}: Props) => {
  return (
    <Link href={path}>
      <Title
        fontsize={fontsize}
        color={color}
        hoverColor={hoverColor}
        margin={margin}>
        {title}
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

export default Anchor;
