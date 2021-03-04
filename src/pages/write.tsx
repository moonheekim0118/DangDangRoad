import React from 'react';
import WritePost from 'components/Post/WritePost';
import Loading from 'components/Loading';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const Write = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? <WritePost mode="create" /> : <Loading />;
};

export default Write;
