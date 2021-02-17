import React from 'react';
import MyPage from 'components/MyPage';
import UpdateProfile from 'components/MyPage/UpdateProfile';
import Loading from 'components/Loading';
import useUser from 'libs/useUser';

const updateProfile = () => {
  const { user } = useUser({ redirectTo: '/login' });

  return user && user.isLoggedIn ? (
    <MyPage userInfo={user}>
      <UpdateProfile />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updateProfile;
