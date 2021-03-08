import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colorCode } from 'common/style/color';

export const iconStyle = css`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: ${colorCode['blue']};
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
`;

export const ImagePlusButton = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: grid;
  place-items: center;
  background-color: ${colorCode['light-gray']};
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
