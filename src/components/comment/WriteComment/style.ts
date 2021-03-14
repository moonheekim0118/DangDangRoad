import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';
import { css } from '@emotion/react';

export const submitBtnStyle = css`
  font-size: 0.9rem;
  transition: none;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export const TextArea = styled.textarea`
  background-color: #fff;
  resize: none;
  width: 100%;
  color: black;
  border: none;
  border-top: 1px solid ${colorCode['light-gray']};
  padding: 15px;

  &:focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  color: ${colorCode['light-blue']};
  top: 50%;
  transform: translateY(-50%);
  right: -40px;

  @media only screen and (max-width: 910px) {
    right: 10px;
  }
`;
