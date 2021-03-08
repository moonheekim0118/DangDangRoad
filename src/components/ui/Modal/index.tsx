import React from 'react';
import ReactDOM from 'react-dom';
import { useElement } from 'hooks';
import * as S from './style';

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
          <S.Overlay onClick={modalHandler} />
          {children}
        </>,
        root
      )
    : null;
};

export default Modal;
