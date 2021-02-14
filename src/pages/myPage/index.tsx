import React from 'react';
import MyPage from 'components/MyPage';
import Loading from 'components/Loading';

import MyReviews from 'components/MyPage/MyReviews';
import useLoginCheck from 'hooks/useLoginCheck';
import useWithAuth from 'hooks/useWithAuth';
import { useLoginInfoState } from 'context/LoginInfo';

const myPage = (): React.ReactElement => {
  useLoginCheck();
  const { userId } = useLoginInfoState();
  const renderable = useWithAuth();

  return renderable ? (
    <MyPage userId={userId}>
      <MyReviews />
    </MyPage>
  ) : (
    <Loading />
  );
};

export default myPage;
