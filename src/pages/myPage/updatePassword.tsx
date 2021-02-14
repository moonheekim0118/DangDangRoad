import React from 'react';
import MyPage from 'components/MyPage';
import UpdatePassword from 'components/MyPage/UpdatePassword';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const updatePassword = () => {
  useLoginCheck();
  const { userId, isLoggedIn } = useLoginInfoState();
  useWithAuth(isLoggedIn);

  if (!isLoggedIn) return <Loading />;
  return <MyPage userId={userId}>{UpdatePassword}</MyPage>;
};

export default updatePassword;
