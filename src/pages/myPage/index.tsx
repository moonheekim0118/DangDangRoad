import React from 'react';
import MyPage from 'components/MyPage';
import Loading from 'components/Loading';
import MyReviews from 'components/MyPage/MyReviews';
import { MYPAGE_MENU_DEFAULT } from 'common/constant/string';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const myPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPage pageName={MYPAGE_MENU_DEFAULT} userInfo={user}>
      <MyReviews />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default myPage;
