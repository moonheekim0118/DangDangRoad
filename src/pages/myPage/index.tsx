import React from 'react';
import MyPage from 'components/MyPage';
import Loading from 'components/Loading';

import MyReviews from 'components/MyPage/MyReviews';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const myPage = (): React.ReactElement => {
  useLoginCheck();
  const { userId, isLoggedIn } = useLoginInfoState();
  useWithAuth(isLoggedIn);

  if (!isLoggedIn) return <Loading />;
  return <MyPage userId={userId}>{MyReviews}</MyPage>;
};

export default myPage;
