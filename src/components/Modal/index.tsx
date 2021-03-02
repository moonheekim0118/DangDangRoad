import React from 'react';
import ReactDOM from 'react-dom';
import { useElement } from 'hooks';
import styled from '@emotion/styled';

interface Props {
  /** Modal's inner contents */
  children: React.ReactNode;
  /** show modal or not */
  showModal: boolean;
  /** close / open modal handler */
  modalHandler: () => void;
}

const Modal = ({
  children,
  showModal,
  modalHandler,
}: Props): React.ReactElement => {
  const root = useElement('modal-root');

  return showModal && root
    ? ReactDOM.createPortal(
        <>
          <Overlay onClick={modalHandler} />
          {children}
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
  z-index: 6000;
`;

export default Modal;
