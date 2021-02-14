import React from 'react';
import MyPage from 'components/MyPage';
import UpdatePassword from 'components/MyPage/UpdatePassword';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const updatePassword = () => {
  useLoginCheck();
  const { userId } = useLoginInfoState();
  const renderable = useWithAuth();

  return renderable ? (
    <MyPage userId={userId}>
      <UpdatePassword />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updatePassword;
