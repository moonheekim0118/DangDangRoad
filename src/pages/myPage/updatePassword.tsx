import React from 'react';
import { MyPageLayout, UpdatePassword } from 'components/MyPage';
import { Loading } from 'components/ui';
import { useUser } from 'hooks';
import { MYPAGE_NAVIGATOR } from 'common/constant/string';
import Head from 'next/head';
import routes from 'common/constant/routes';

const updatePassword = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR.updatePassword} userInfo={user}>
      <Head>
        <title>댕댕로드 | 비밀번호 변경</title>
      </Head>
      <UpdatePassword userId={user.userId} />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default updatePassword;
