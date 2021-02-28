import { useCallback } from 'react';
import { useModal } from 'hooks';
import api from 'api';
import Router from 'next/router';

const useDestroyAccount = (userId: string) => {
  /** Remove Confirm Modal */
  const [showModal, modalHandler] = useModal(false);

  const DestroyHandler = useCallback(async () => {
    const response = await api.destroyAccount(userId);
    if (!response.isError) {
      await api.signOut();
      Router.push('/');
    }
    modalHandler();
  }, []);

  return { showModal, modalHandler, DestroyHandler };
};

export default useDestroyAccount;
