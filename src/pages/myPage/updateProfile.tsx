import React from 'react';
import MyPage from 'components/MyPage';
import UpdateProfile from 'components/MyPage/UpdateProfile';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import useUser from 'hooks/useUser';
import { useLoginInfoState } from 'context/LoginInfo';

const updateProfile = () => {
  useLoginCheck();
  const { userId } = useLoginInfoState();
  const [userInfo] = useUser({ userId });
  const renderable = useWithAuth();

  return renderable ? (
    <MyPage userInfo={userInfo} pageName="update Profile">
      <UpdateProfile userInfo={userInfo} />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updateProfile;
