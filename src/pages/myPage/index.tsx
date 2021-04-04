import React from 'react';
import { Loading } from 'components/UI';
import { useUser } from 'hooks';
import { MYPAGE_NAVIGATOR } from 'common/constant/string';
import routes from 'common/constant/routes';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const MyPageLayout = dynamic(() => import('components/MyPage/MyPageLayout'));
const UpdateProfile = dynamic(() => import('components/MyPage/UpdateProfile'));

const updateProfile = () => {
  const { user, mutateUser } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR.updateProfile} userInfo={user}>
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
