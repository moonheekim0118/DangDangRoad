import React from 'react';
import MyPage from 'components/MyPage';
import UpdatePassword from 'components/MyPage/UpdatePassword';
import { MYPAGE_MENU_UPDATE_PASSWORD } from 'common/constant/string';
import routes from 'common/constant/routes';
import Loading from 'components/Loading';
import useUser from 'libs/useUser';

const updatePassword = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPage userInfo={user} pageName={MYPAGE_MENU_UPDATE_PASSWORD}>
      <UpdatePassword userId={user.userId} />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updatePassword;
