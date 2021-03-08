import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const iconStyle = css`
  width: 25px;
  height: 25px;
`;

export const Post = styled.div`
  width: 300px;
  height: 300px;
  cursor: pointer;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const Overlay = styled.div`
  opacity: 0;
  display: grid;
  place-items: center;
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2000;

  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Description = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const PlaceName = styled.span`
  max-height: 80px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;
