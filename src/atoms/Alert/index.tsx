import React from 'react';
import Icon from 'atoms/Icon';
import styled from '@emotion/styled';
import { colorCode } from 'types/Color';
import {
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  /** type of Alert, error or just notification */
  type: 'error' | 'noti';
  /** closing alert handler */
  closeAlertHandelr: () => void;
}

const Alert = ({ children, type, closeAlertHandelr }: Props) => {
  // main color
  const mainColor = type === 'error' ? 'red' : 'green';

  return (
    <Container color={mainColor}>
      <Icon iconsize={24} icon={faExclamationCircle} color={mainColor} />
      <Title>{children}</Title>
      <CloseIconContainer>
        <Icon
          iconsize={15}
          icon={faTimes}
          color={mainColor}
          iconClickHandler={closeAlertHandelr}
        />
      </CloseIconContainer>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  text-align: center;
  color: ${(props) => colorCode[props.color]};
  font-weight: bold;
  background-color: ${(props) =>
    props.color === 'red' ? 'rgba(255, 0, 0,0.3)' : 'rgba(51, 204, 51,0.3)'};
  border: 1px solid ${(props) => colorCode[props.color]};
  border-radius: 10px;
`;

const Title = styled.span`
  margin-left: 15px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default Alert;
