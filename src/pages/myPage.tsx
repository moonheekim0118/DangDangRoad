import React from 'react';
import MyPage from 'components/MyPage';
import useLoginCheck from 'hooks/useLoginCheck';
import withAuth from 'helpers/withAuth';
import { useLoginInfoState } from 'context/LoginInfo';
import useUser from 'hooks/useUser';

const myPage = () => {
  useLoginCheck();
  const { userId } = useLoginInfoState();
  const [userInfo] = useUser({ userId });

  return <MyPage userInfo={userInfo} />;
};

export default withAuth(myPage);
