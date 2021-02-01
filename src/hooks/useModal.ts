import { useState, useEffect, useCallback } from 'react';

const useModal = (opend) => {
  const [showModal, setShowModal] = useState<boolean>(opend);

  useEffect(() => {
    setShowModal(opend);
  }, [opend]);

  const modalHandler = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return [showModal, modalHandler] as const;
};

export default useModal;
