import React from 'react';
import MyPage from 'components/MyPage';
import Loading from 'components/Loading';
import MyReviews from 'components/MyPage/MyReviews';
import useUser from 'libs/useUser';

const myPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: '/login' });

  console.log(user);
  return user && user.isLoggedIn ? (
    <MyPage userInfo={user}>
      <MyReviews />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default myPage;
