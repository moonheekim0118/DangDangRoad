import React from 'react';
import MyPage from 'components/MyPage';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const myPage = () => {
  useLoginCheck();
  const { userId, isLoggedIn } = useLoginInfoState();
  useWithAuth(isLoggedIn);

  if (!isLoggedIn) return <Loading />;
  return <MyPage userId={userId} />;
};

export default myPage;
