import React from 'react';
import MyPage from 'components/MyPage';
import Loading from 'components/Loading';

import MyReviews from 'components/MyPage/MyReviews';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import useUser from 'hooks/useUser';
import { useLoginInfoState } from 'context/LoginInfo';

const myPage = (): React.ReactElement => {
  useLoginCheck();
  const { userId } = useLoginInfoState();
  const [userInfo] = useUser({ userId });
  const renderable = useWithAuth();

  return renderable ? (
    <MyPage userInfo={userInfo}>
      <MyReviews />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default myPage;
