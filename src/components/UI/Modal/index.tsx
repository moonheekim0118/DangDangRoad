import React from 'react';
import ReactDOM from 'react-dom';
import { useElement } from 'hooks';
import * as S from './style';

interface Props {
  /** Modal's inner contents */
  children: React.ReactNode;
  /** close / open modal handler */
  onClick: () => void;
}

const Modal = ({ children, onClick }: Props): React.ReactElement | null => {
  const root = useElement('modal-root');

  return root
    ? ReactDOM.createPortal(
        <>
          <S.Overlay onClick={onClick} />
          {children}
        </>,
        root
      )
    : null;
};

export default Modal;
