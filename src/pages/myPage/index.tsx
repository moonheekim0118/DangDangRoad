import React from 'react';
import { Loading } from 'components/ui';
import { useUser } from 'hooks';
import { MYPAGE_NAVIGATOR } from 'common/constant/string';
import Head from 'next/head';
import routes from 'common/constant/routes';
import dynamic from 'next/dynamic';

const MyPageLayout = dynamic(() => import('components/MyPage/MyPageLayout'));

const MyReviews = dynamic(() => import('components/MyPage/MyReviews'));

const MyPage = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR.myReviews} userInfo={user}>
      <Head>
        <title>댕댕로드 | 내가 작성한 리뷰</title>
      </Head>
      <MyReviews />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default MyPage;
