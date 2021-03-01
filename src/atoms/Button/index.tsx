import React, { memo } from 'react';
import { colorCode, ColorType } from 'types/Color';
import styled from '@emotion/styled';

interface Props {
  /** text of button */
  children: React.ReactNode;
  /** color of button */
  color?: 'blue' | 'white';
  /** hoverColor */
  hoverColor?: ColorType;
  /** type of button */
  type?: 'button' | 'submit' | 'reset';
  /** button border */
  shadow?: boolean;
  /** onClick event function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  color,
  hoverColor,
  shadow = true,
  type = 'button',
  onClick,
}: Props): React.ReactElement => {
  return (
    <Container
      type={type}
      onClick={onClick}
      color={color}
      shadow={shadow}
      hoverColor={hoverColor}>
      {children}
    </Container>
  );
};

const Container = styled.button<{
  color?: string;
  hoverColor?: string;
  shadow?: boolean;
}>`
  width: 100%;
  background-color: ${(props) =>
    props.color ? colorCode[props.color] : 'inherit'};
  color: ${(props) =>
    props.color
      ? props.color === 'blue'
        ? colorCode['white']
        : colorCode['blue']
      : 'inherit'};
  font-size: 1.2rem;
  border: none;
  border-radius: 15px;
  padding: 13px 15px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.shadow && '0px 0px 3px 0px rgba(0, 0, 0, 0.25)'};

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.hoverColor && colorCode[props.hoverColor]};
  }

  &:focus {
    outline: none;
  }
`;

export default memo(Button);
