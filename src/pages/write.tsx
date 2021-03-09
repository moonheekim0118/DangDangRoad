import React from 'react';
import { WritePost } from 'components/post';
import { useUser } from 'hooks';
import Loading from 'components/ui/Loading';
import routes from 'common/constant/routes';

const Write = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? (
    <WritePost mode="create" userId={user.userId} />
  ) : (
    <Loading />
  );
};

export default Write;
