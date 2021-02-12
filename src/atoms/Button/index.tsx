import React, { memo } from 'react';
import { colorCode, colorTypes } from 'types/colorCode';
import styled from '@emotion/styled';

interface Props {
  /** text of button */
  children: React.ReactNode;
  /** color of button */
  color: 'blue' | 'white';
  /** hoverColor */
  hoverColor?: colorTypes;
  /** type of button */
  type?: 'button' | 'submit' | 'reset';
  /** onClick event function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  color,
  hoverColor,
  type = 'button',
  onClick,
}: Props) => {
  return (
    <Container
      type={type}
      onClick={onClick}
      color={color}
      hoverColor={hoverColor}>
      {children}
    </Container>
  );
};

const Container = styled.button<{ color: string; hoverColor?: string }>`
  width: 100%;
  background-color: ${(props) => colorCode[props.color]};
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  font-size: 1.2rem;
  border: none;
  border-radius: 15px;
  padding: 13px 15px;
  cursor: pointer;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);

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
