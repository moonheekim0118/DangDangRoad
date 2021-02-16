import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { UserType } from 'types/User';
import { useLoginInfoDispatch } from 'context/LoginInfo';

interface Props {
  /** path for redirection */
  redirectTo?: string;
  /** true if it should be redirected when user is found */
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound = false }: Props = {}): {
  user: UserType;
} => {
  const dispatch = useLoginInfoDispatch();
  const { data: user } = useSWR('/api/loginCheck');

  useEffect(() => {
    // after getting data, dispatch this data to Context
    if (user && user.isLoggedIn) dispatch({ type: 'login', data: user });
    if (user && !user.isLoggedIn) dispatch({ type: 'logout' });

    // if data is not yet here
    if (!redirectTo || !user) return;

    /** when it needs to be redirected */
    if (
      (redirectTo && !redirectIfFound && !user.isLoggedIn) ||
      (redirectIfFound && user.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectIfFound]);

  return { user };
};

export default useUser;
