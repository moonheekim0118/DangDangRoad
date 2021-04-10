import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export const shake = keyframes`
  0% { transform: translate(1px, 0px) rotate(0deg); }
  10% { transform: translate(-1px, 0px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 0px) rotate(0deg); }
  40% { transform: translate(1px, 0px) rotate(1deg); }
  50% { transform: translate(-1px, 0px) rotate(-1deg); }
  60% { transform: translate(-3px, 0px) rotate(0deg); }
  70% { transform: translate(3px, 0px) rotate(-1deg); }
  80% { transform: translate(-1px, 0px) rotate(1deg); }
  90% { transform: translate(1px, 0px) rotate(0deg); }
  100% { transform: translate(1px, 0px) rotate(-1deg); }
`;

export const removeMode = css`
  animation: ${shake} 0.8s infinite;

  &:hover {
    background-color: rgba(252, 105, 96, 0.2);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 90%;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 90%;
  height: 80px;
  border: 1px solid #f4f4f4;
  border-left: 3px solid var(--colors-light-blue);
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.075);
  cursor: pointer;

  transition: all 0.5s ease;
  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const PlaceInfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const PlaceName = styled.span`
  font-size: 1rem;
  color: var(--colors-light-blue);
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const AddressName = styled.span`
  font-size: 0.8rem;
  color: color: var( --colors-dark-gray);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
