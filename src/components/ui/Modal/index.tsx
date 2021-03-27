import React from 'react';
import ReactDOM from 'react-dom';
import { useElement } from 'hooks';
import * as S from './style';

interface Props {
  /** Modal's inner contents */
  children: React.ReactNode;
  /** close / open modal handler */
  modalHandler: () => void;
}

const Modal = ({ children, modalHandler }: Props): React.ReactElement => {
  const root = useElement('modal-root');

  return root
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
