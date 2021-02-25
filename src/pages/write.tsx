import React from 'react';
import WritePost from 'components/WritePost';
import Loading from 'components/Loading';
import useUser from 'libs/useUser';

const Write = () => {
  const { user } = useUser({ redirectTo: '/login' });

  return user && user.isLoggedIn ? <WritePost /> : <Loading />;
};

export default Write;
