import React from 'react';
import MyPage from 'components/MyPage';
import UpdatePassword from 'components/MyPage/UpdatePassword';
import Loading from 'components/Loading';
import useUser from 'libs/useUser';

const updatePassword = () => {
  const { user } = useUser({ redirectTo: '/login' });

  return user && user.isLoggedIn ? (
    <MyPage userInfo={user} pageName="update Password">
      <UpdatePassword userId={user.userId} />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updatePassword;
