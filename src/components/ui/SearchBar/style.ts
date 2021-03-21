import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const iconStyle = css`
  transform: rotateY(180deg);
`;

export const searchBtnStyle = css`
  transition: none;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;

  @media only screen and (max-width: 910px) {
    right: 10px;
  }
`;

export const colorThemes = {
  blue: css`
    background-color: ${colorCode['blue']};
    color: ${colorCode['white']};
  `,
  white: css`
    background-color: ${colorCode['white']};
    color: ${colorCode['blue']};
  `,
};

export const inputColorThemes = {
  blue: css`
    background-color: ${colorCode['blue']};
    color: ${colorCode['white']};
    ::placeholder {
      color: ${colorCode['white']};
    }
  `,
  white: css`
    background-color: ${colorCode['white']};
    color: ${colorCode['blue']};
    ::placeholder {
      color: ${colorCode['blue']};
    }
  `,
};

export const focusThemes = {
  fromBlueToWhite: css`
    &:focus {
      outline: none;
      background-color: ${colorCode['white']};
      color: ${colorCode['blue']};
    }

    &:focus ~ ${ButtonContainer}, &:focus ~ ${Label}, &:focus::placeholder {
      background-color: ${colorCode['white']};
      color: ${colorCode['blue']};
    }
  `,
  fromWhiteToBlue: css`
    &:focus {
      outline: none;
      background-color: ${colorCode['blue']};
      color: ${colorCode['white']};
    }

    &:focus ~ ${ButtonContainer}, &:focus ~ ${Label}, &:focus::placeholder {
      background-color: ${colorCode['blue']};
      color: ${colorCode['white']};
    }
  `,
  default: css``,
};

export const inputStyle = css`
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
  }
`;
