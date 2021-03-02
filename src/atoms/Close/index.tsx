import React from 'react';
import { Icon } from 'atoms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

interface Props {
  closeHanlder: () => void;
}

const Close = ({ closeHanlder }: Props) => {
  return (
    <Container onClick={closeHanlder}>
      <Icon icon={faTimes} iconsize={25} />
    </Container>
  );
};

const Container = styled.div`
  width: 65px;
  height: 65px;
  text-align: center;
  border-radius: 50%;
  padding: 20px;
  color: black;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 0, 0, 0.3);
  }
`;

export default Close;
