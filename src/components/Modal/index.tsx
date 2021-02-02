import React from 'react';
import ReactDOM from 'react-dom';
import useElement from '../../hooks/useElement';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  modalHandler: () => void;
}

const Modal = ({ children, showModal, modalHandler }: Props) => {
  const root = useElement('modal-root');

  return showModal && root
    ? ReactDOM.createPortal(
        <>
          <Overlay onClick={modalHandler} />
          <Contents>{children}</Contents>
        </>,
        root
      )
    : null;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5000;
`;

const Contents = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateXY(-50%, -50%);
  z-index: 6000;
`;

export default Modal;
