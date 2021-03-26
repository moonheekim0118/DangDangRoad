import React from 'react';
import { MyPageLayout, UpdateProfile } from 'components/MyPage';
import { Loading } from 'components/ui';
import { useUser } from 'hooks';
import { MYPAGE_NAVIGATOR } from 'common/constant/string';
import Head from 'next/head';
import routes from 'common/constant/routes';

const updateProfile = () => {
  const { user, mutateUser } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR.updatePassword} userInfo={user}>
      <Head>
        <title>댕댕로드 | 내 정보 변경</title>
      </Head>
      <UpdateProfile user={user} mutate={mutateUser} />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default updateProfile;
