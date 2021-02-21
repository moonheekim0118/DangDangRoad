import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useElement } from 'hooks';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  modalHandler: () => void;
}

const Modal = ({
  children,
  showModal,
  modalHandler,
}: Props): React.ReactElement => {
  const root = useElement('modal-root');

  const ContentsHandler = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return showModal && root
    ? ReactDOM.createPortal(
        <>
          <Overlay onClick={modalHandler}>
            <Contents onClick={ContentsHandler}>{children}</Contents>
          </Overlay>
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
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5000;
`;

const Contents = styled.section`
  z-index: 6000;
`;

export default Modal;
