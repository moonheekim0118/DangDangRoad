import React from 'react';
import MyPage from 'components/MyPage';
import UpdateProfile from 'components/MyPage/UpdateProfile';
import Loading from 'components/Loading';
import useUser from 'libs/useUser';
import routes from 'common/constant/routes';

import { MYPAGE_MENU_UPDATE_PROFILE } from 'common/constant/string';

const updateProfile = () => {
  const { user, mutateUser } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPage userInfo={user} pageName={MYPAGE_MENU_UPDATE_PROFILE}>
      <UpdateProfile user={user} mutate={mutateUser} />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default updateProfile;
