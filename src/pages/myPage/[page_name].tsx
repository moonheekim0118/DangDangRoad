import React from 'react';
import {
  MyPageLayout,
  MyReviews,
  UpdatePassword,
  UpdateProfile,
} from 'components/MyPage';
import {
  MYPAGE_DEFAULT_QUERY,
  MYPAGE_UPDATE_PASSWORD_QUERY,
  MYPAGE_UPDATE_PROFILE_QUERY,
  MYPAGE_NAVIGATOR,
} from 'common/constant/string';
import { useRouter } from 'next/router';
import { Loading } from 'components/ui';
import routes from 'common/constant/routes';
import { useUser } from 'hooks';

const myPage = (): React.ReactElement => {
  const router = useRouter();
  const query = router.query.page_name;
  const { user, mutateUser } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn && typeof query === 'string' ? (
    <MyPageLayout pageName={MYPAGE_NAVIGATOR[query] || ''} userInfo={user}>
      {query === MYPAGE_DEFAULT_QUERY && <MyReviews />}
      {query === MYPAGE_UPDATE_PASSWORD_QUERY && (
        <UpdatePassword userId={user.userId} />
      )}
      {query === MYPAGE_UPDATE_PROFILE_QUERY && (
        <UpdateProfile user={user} mutate={mutateUser} />
      )}
      {query !== MYPAGE_DEFAULT_QUERY &&
        query !== MYPAGE_UPDATE_PASSWORD_QUERY &&
        query !== MYPAGE_UPDATE_PROFILE_QUERY && (
          <span>존재하지 않는 페이지 입니다</span>
        )}
    </MyPageLayout>
  ) : (
    <Loading />
  );
};

export default myPage;
