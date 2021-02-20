import { useCallback } from 'react';
import { useModal } from 'hooks';
import { signOut } from 'api/sign';
import { destroyAccount } from 'api/user';
import Router from 'next/router';

const useDestroyAccount = (userId: string) => {
  /** Remove Confirm Modal */
  const [showModal, modalHandler] = useModal(false);

  const DestroyHandler = useCallback(async () => {
    const response = await destroyAccount(userId);
    if (!response.isError) {
      await signOut();
      Router.push('/');
    }
    modalHandler();
  }, []);

  return { showModal, modalHandler, DestroyHandler };
};

export default useDestroyAccount;
