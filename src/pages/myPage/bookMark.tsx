import { Loading } from 'components/UI';
import { useUser } from 'hooks';
import { useRouter } from 'next/router';
import { MYPAGE_NAVIGATOR } from 'common/constant/string';
import routes from 'common/constant/routes';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const MyPageLayout = dynamic(() => import('components/MyPage/MyPageLayout'));
const BookMarkList = dynamic(() => import('components/MyPage/BookMarkList'));

const BookMark = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const router = useRouter();

  const pageQuery =
    typeof router.query.page === 'string' ? Number(router.query.page) : 1;

  return user && user.isLoggedIn ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR.bookMark} userInfo={user}>
      <Head>
        <title>댕댕로드 | 북마크한 리뷰</title>
      </Head>
      <BookMarkList userId={user.userId} pageNum={pageQuery} />
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default BookMark;
