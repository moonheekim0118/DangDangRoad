import { useEffect } from 'react';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { signOut } from 'api/sign';
import { useLoginInfoDispatch } from 'context/LoginInfo';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as Action from 'action';

/** sign out logic  */
const useSignOut = () => {
  const dispatch = useLoginInfoDispatch();
  const [signOutResult, signOutFetch] = useApiFetch(signOut);

  useEffect(() => {
    if (signOutResult.type === SUCCESS) {
      dispatch(Action.logoutSuccess);
      Router.push(routes.HOME);
    }
  }, [signOutResult]);

  // sign out handler
  const handleSignOut = () => {
    signOutFetch({ type: REQUEST });
  };

  return handleSignOut;
};

export default useSignOut;
