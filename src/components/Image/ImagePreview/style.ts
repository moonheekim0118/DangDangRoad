import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const iconStyle = css`
  cursor: pointer;
  color: var(--colors-blue);
`;

export const iconStyleWhite = css`
  ${iconStyle}
  color:#fff;
`;

export const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  align-items: center;

  > * {
    margin: 0 0.3rem;
  }
`;

export const ImagePlusButton = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--colors-light-gray);
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  width: calc(100% / 3);
  height: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const RemoveImage = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
  cursor: pointer;
`;
