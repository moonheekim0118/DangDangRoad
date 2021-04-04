import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { UserInfo } from 'types/User';
import { useLoginInfoDispatch } from 'context/LoginInfo';
import api from 'common/constant/api';
import * as Action from 'action';

interface Props {
  /** path for redirection */
  redirectTo?: string;
  /** true if it should be redirected when user is found */
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound = false }: Props = {}): {
  user: UserInfo;
  mutateUser: (
    data?: any,
    shouldRevalidate?: boolean | undefined
  ) => Promise<any>;
} => {
  const dispatch = useLoginInfoDispatch();

  const { data: user, mutate: mutateUser } = useSWR(api.LOGIN_CHECK);

  useEffect(() => {
    /** mutate user data when first rendering */
    mutateUser();
  }, []);

  useEffect(() => {
    // after getting data, dispatch this data to Context
    if (user && user.isLoggedIn) dispatch(Action.loginSuccess(user));
    if (user && !user.isLoggedIn) dispatch(Action.logoutSuccess);

    if (redirectTo && user) {
      /** when it needs to be redirected */
      if (
        (redirectTo && !redirectIfFound && !user.isLoggedIn) ||
        (redirectIfFound && user.isLoggedIn)
      ) {
        Router.push(redirectTo);
      }
    }
  }, [user, redirectTo, redirectIfFound]);

  return { user, mutateUser };
};

export default useUser;
