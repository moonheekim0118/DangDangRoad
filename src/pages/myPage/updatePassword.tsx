import React from 'react';
import { MyPageLayout, UpdatePassword } from 'components/mypage';
import { MYPAGE_MENU_UPDATE_PASSWORD } from 'common/constant/string';
import routes from 'common/constant/routes';
import Loading from 'components/ui/Loading';
import useUser from 'libs/useUser';

const updatePassword = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout userInfo={user} pageName={MYPAGE_MENU_UPDATE_PASSWORD}>
      <UpdatePassword userId={user.userId} />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default updatePassword;
