import React from 'react';
import styled from '@emotion/styled';

interface Props {
  /** contents of pop up */
  contents: string;
  /** close button handler */
  closeHandler?: () => void;
  /** yes button handler  */
  submitHandler?: () => void;
}

/** confrim pop up atom */
const ConfirmPopUp = ({ contents, closeHandler, submitHandler }: Props) => {
  return (
    <Container>
      <Title>{contents}</Title>
      <ButtonContainer>
        <Button title="close" onClick={closeHandler}>
          CLOSE
        </Button>
        <Button title="keep" onClick={submitHandler}>
          SUBMIT
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 150px;

  background-color: #fff;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
`;

const Title = styled.div`
  width: 100%;
  height: 65%;
  padding: 30px;
  text-align: center;
  border-bottom: 1px solid #e0e0d1;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 35%;
`;

const Button = styled.button<{ title: string }>`
  border: none;
  width: 50%;
  height: 100%;
  background-color: inherit;
  padding: 17px 10px;
  font-weight: bold;
  color: ${(props) => (props.title === 'close' ? 'red' : 'green')};
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:nth-of-type(1) {
    border-right: 1px solid #e0e0d1;
    border-bottom-left-radius: 10px;
  }

  &:nth-of-type(2) {
    border-bottom-right-radius: 10px;
  }

  &:hover {
    background-color: #e0e0d1;
  }
`;

export default ConfirmPopUp;
