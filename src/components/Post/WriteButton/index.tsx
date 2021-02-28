import React from 'react';
import { Icon, Anchor } from 'atoms';
import { colorCode } from 'types/Color';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const WriteButton = () => {
  return (
    <Container>
      <Anchor fontsize={1.2} fontbold={true} path="/write">
        <Button>
          <Icon icon={faFeather} iconsize={30} />
          <Description>리뷰 작성하기</Description>
        </Button>
      </Anchor>
    </Container>
  );
};

const Description = styled.span`
  text-align: center;
  display: none;
`;

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 50px;
  z-index: 1000;
`;

const Button = styled.div`
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
