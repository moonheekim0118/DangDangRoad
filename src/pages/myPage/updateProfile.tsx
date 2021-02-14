import React from 'react';
import MyPage from 'components/MyPage';
import UpdateProfile from 'components/MyPage/UpdateProfile';
import Loading from 'components/Loading';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const updateProfile = () => {
  useLoginCheck();
  const { userId, isLoggedIn } = useLoginInfoState();
  useWithAuth(isLoggedIn);

  if (!isLoggedIn) return <Loading />;
  return (
    <MyPage userId={userId}>
      <UpdateProfile />
    </MyPage>
  );
};

export default updateProfile;
