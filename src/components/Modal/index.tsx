import React from 'react';
import ReactDOM from 'react-dom';
import useElement from '../../hooks/useElement';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  modalHandler: () => void;
  modalState: boolean;
}

const Modal = ({ children, modalHandler }: Props) => {
  const root = useElement('modal-root');

  return root
    ? ReactDOM.createPortal(
        <>
          <Overlay />
          <Contents>{children}</Contents>
        </>,
        root
      )
    : null;
};

const Overlay = styled.div``;

const Contents = styled.div``;

export default Modal;
