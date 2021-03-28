import React, { useCallback } from 'react';
import { Loading } from 'components/ui';
import { useUser } from 'hooks';
import { MYPAGE_NAVIGATOR } from 'common/constant/string';
import Head from 'next/head';
import routes from 'common/constant/routes';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const MyPageLayout = dynamic(() => import('components/MyPage/MyPageLayout'));
const BookMarkList = dynamic(() => import('components/MyPage/BookMarkList'));

const BookMark = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const router = useRouter();

  const getQuery = useCallback(() => {
    let pageNum = router.query.page;
    if (typeof pageNum === 'string') {
      return +pageNum;
    }
    return 1;
  }, []);

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR.bookMark} userInfo={user}>
      <Head>
        <title>댕댕로드 | 북마크한 리뷰</title>
      </Head>
      <BookMarkList userId={user.userId} pageNum={getQuery()} />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default BookMark;
