import { useEffect, useCallback } from 'react';
import { useModal } from 'hooks';
import { destroyAccount } from 'api/user';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/useApiFetch';
import Router from 'next/router';

const useDestroyAccount = (userId: string) => {
  /** Remove Confirm Modal */
  const [showModal, modalHandler] = useModal(false);
  const [destroyResult, destroyDispatch] = useApiFetch(destroyAccount);

  useEffect(() => {
    if (destroyResult.type === SUCCESS) {
      Router.push('/');
      modalHandler();
    }
  }, [destroyResult.type]);

  const DestroyHandler = useCallback(() => {
    destroyDispatch({ type: REQUEST, params: [userId] });
  }, []);

  return { showModal, modalHandler, DestroyHandler };
};

export default useDestroyAccount;
