import React from 'react';
import Icon from 'atoms/Icon';
import styled from '@emotion/styled';
import { colorCode } from 'types/colorCode';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  /** type of Alert, error or just notification */
  type: 'error' | 'noti';
}

const Alert = ({ children, type }: Props) => {
  return (
    <Container color={type === 'error' ? 'red' : 'green'}>
      <Icon
        iconsize={24}
        icon={faExclamationCircle}
        color={type === 'error' ? 'red' : 'green'}
      />
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
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

export default Alert;
