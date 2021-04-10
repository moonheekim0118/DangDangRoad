import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const submitBtnStyle = css`
  font-size: 0.9rem;
  transition: none;
`;

export const Form = styled.form`
  width: 100%;
  height: 110px;
`;

export const TextArea = styled.textarea`
  background-color: #fff;
  resize: none;
  width: 100%;
  color: black;
  border: none;
  border-top: 1px solid var(--colors-light-gray);
  padding: 15px;

  &:focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: var(--colors-light-blue);
  @media only screen and (max-width: 910px) {
    right: 10px;
  }
`;
