import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { UserType } from 'types/user';
import { useLoginInfoDispatch } from 'context/LoginInfo';

interface Props {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound = false }: Props = {}): {
  user: UserType;
} => {
  const dispatch = useLoginInfoDispatch();
  const { data: user } = useSWR('/api/checkAuth');

  useEffect(() => {
    // 페칭 후 context 에 정보 저장
    if (user && user.isLoggedIn) dispatch({ type: 'login', data: user });
    if (user && !user.isLoggedIn) dispatch({ type: 'logout' });

    // 데이터 페칭 전
    if (!redirectTo || !user) return;

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
