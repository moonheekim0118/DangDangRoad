import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Description = styled.span`
  text-align: center;
  display: none;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 50px;
  z-index: 3500;
`;

export const WriteComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorCode['blue']};
  color: #fff;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  z-index: 2001;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    width: 250px;
    border-radius: 25px;
    justify-content: space-around;
  }

  &:hover > ${Description} {
    display: block;
  }
`;
