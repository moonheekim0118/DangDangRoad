import React from 'react';
import { colorCode } from '../../model/colorCode';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  color: 'blue' | 'white';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, color, onClick }: Props) => {
  return (
    <Container onClick={onClick} color={color}>
      {children}
    </Container>
  );
};

const Container = styled.button<{ color: string }>`
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

  &:focus {
    outline: none;
  }
`;

export default Button;
