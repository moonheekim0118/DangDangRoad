import React from 'react';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';

interface Props {
  children: React.ReactNode;
  opend: boolean;
}
const ModalProvider = ({ children, opend }: Props) => {
  const [showModal, modalHandler] = useModal(opend);

  return showModal ? (
    <Modal modalState={showModal} modalHandler={modalHandler}>
      {children}
    </Modal>
  ) : null;
};

export default ModalProvider;
