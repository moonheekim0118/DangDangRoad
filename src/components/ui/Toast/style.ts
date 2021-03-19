import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { colorCode } from 'common/style/color';
import { NOTI_TIME } from 'common/constant/number';

const fade = keyframes`
    0%,100% { opacity: 0; transform: scale(0.7,0.7)}
    10%,90% { opacity: 1; transform: scale(1)}
`;

export const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 50000;
`;

export const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  border-radius: 15px;
  word-wrap: wrap;
  word-break: break-all;
  color: #fff;
  font-weight: bold;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

export const Message = styled.span`
  margin-left: 1.5rem;
`;

export const themes = {
  success: css`
    background-color: ${colorCode['green']};
  `,
  info: css`
    background-color: ${colorCode['light-blue']};
  `,
  fail: css`
    background-color: ${colorCode['light-red']};
  `,
};

export const showAnimation = css`
  animation: ${fade} ${NOTI_TIME / 1000}s ease forwards;
`;

export const sizes = {
  large: css`
    width: 18.75rem;
    padding: 1.563rem 1.25rem;
    font-size: 1.1rem;
  `,
  medium: css`
    width: 13.125rem;
    padding: 1.25rem 0.938rem;
    font-size: 0.8rem;
  `,
  small: css`
    width: 8.125rem;
    padding: 0.938rem 0.625rem;
    font-size: 0.5rem;
  `,
};
