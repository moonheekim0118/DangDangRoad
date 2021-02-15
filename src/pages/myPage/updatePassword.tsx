import React from 'react';
import MyPage from 'components/MyPage';
import UpdatePassword from 'components/MyPage/UpdatePassword';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import useUser from 'hooks/useUser';
import { useLoginInfoState } from 'context/LoginInfo';

const updatePassword = () => {
  useLoginCheck();
  const { userId } = useLoginInfoState();
  const [userInfo] = useUser({ userId });
  const renderable = useWithAuth();

  return renderable ? (
    <MyPage userInfo={userInfo} pageName="update Password">
      <UpdatePassword />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updatePassword;
