import React from 'react';
import MyPage from 'components/MyPage';
import useLoginCheck from 'hooks/useLoginCheck';
import withAuth from 'helpers/withAuth';

const myPage = () => {
  useLoginCheck();

  return <MyPage />;
};

export default withAuth(myPage);
