import React from 'react';
import { LoadingSinglePost } from 'components/ui';
import Container from './style';

export interface Props {
  isModal: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const Card = ({ isModal, isLoading, children }: Props) => {
  return (
    <Container isModal={isModal}>
      {isLoading ? <LoadingSinglePost /> : children}
    </Container>
  );
};

export default Card;
