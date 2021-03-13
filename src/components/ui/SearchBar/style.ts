import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';
import { Props } from './index';

interface InputProps extends Props {
  focusBackground?: 'blue' | 'white';
  focusFont?: 'blue' | 'white';
}

export const iconStyle = css`
  transform: rotateY(180deg);
`;

export const SearchButton = styled.button`
  font-size: 0.9rem;
  color: inherit;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

export const Form = styled.form`
  width: 100%;
`;

export const IconContainer = styled.div<Props>`
  position: absolute;
  top: 50%;
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  transform: translateY(-50%);
  left: 10px;
`;

export const ButtonContainer = styled.div<Props>`
  position: absolute;
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  top: 50%;
  transform: translateY(-50%);
  right: -40px;

  @media only screen and (max-width: 910px) {
    right: 10px;
  }
`;

export const Input = styled.input<InputProps>`
  background-color: ${(props) => colorCode[props.color]};
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  border: none;
  border-radius: 20px;
  width: 120%;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  ::placeholder {
    color: ${(props) =>
      props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  }

  &:focus {
    outline: none;
    background-color: ${(props) =>
      props.focusBackground && colorCode[props.focusBackground]};
    color: ${(props) => props.focusFont && colorCode[props.focusFont]};
  }

  &:focus
    ~ ${ButtonContainer},
    &:focus
    ~ ${IconContainer},
    &:focus::placeholder {
    background-color: ${(props) =>
      props.focusBackground && colorCode[props.focusBackground]};
    color: ${(props) => props.focusFont && colorCode[props.focusFont]};
  }

  @media only screen and (max-width: 910px) {
    width: 100%;
  }
`;
