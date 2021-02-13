import React from 'react';
import useLoginCheck from 'hooks/useLoginCheck';
import withAuth from 'helpers/withAuth';

const myPage = () => {
  useLoginCheck();

  return <></>;
};

export default withAuth(myPage);
