import { useState, useEffect, useCallback } from 'react';

const useModal = (opend: boolean) => {
  const [showModal, setShowModal] = useState<boolean>(opend);

  useEffect(() => {
    setShowModal(opend);
  }, [opend]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = 'hidden'; // modal open 시 overflow 감추기
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showModal]);

  const modalHandler = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return [showModal, modalHandler] as const;
};

export default useModal;
