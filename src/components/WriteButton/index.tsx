import React from 'react';
import { Icon } from 'atoms';
import { colorCode } from 'types/Color';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

interface Props {
  openWriteModal: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const WriteButton = ({ openWriteModal }: Props) => {
  return (
    <Container onClick={openWriteModal}>
      <Icon icon={faFeather} iconsize={30} />
      <Description>리뷰 작성하기</Description>
    </Container>
  );
};

const Description = styled.span`
  text-align: center;
  display: none;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;
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

export default WriteButton;
