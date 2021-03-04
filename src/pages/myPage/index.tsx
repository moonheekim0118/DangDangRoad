import React from 'react';
import { MyPageLayout, MyReviews } from 'components/mypage';
import { MYPAGE_MENU_DEFAULT } from 'common/constant/string';
import Loading from 'components/ui/Loading';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const myPage = (): React.ReactElement => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_MENU_DEFAULT} userInfo={user}>
      <MyReviews />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default myPage;
