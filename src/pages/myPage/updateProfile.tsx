import React from 'react';
import { MyPageLayout, UpdateProfile } from 'components/mypage';
import { useUser } from 'hooks';
import Loading from 'components/ui/Loading';
import routes from 'common/constant/routes';

import { MYPAGE_MENU_UPDATE_PROFILE } from 'common/constant/string';

const updateProfile = () => {
  const { user, mutateUser } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout userInfo={user} pageName={MYPAGE_MENU_UPDATE_PROFILE}>
      <UpdateProfile user={user} mutate={mutateUser} />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default updateProfile;
