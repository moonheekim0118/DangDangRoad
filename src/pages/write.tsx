import React from 'react';
import { WritePost } from 'components/post';
import Loading from 'components/ui/Loading';
import routes from 'common/constant/routes';
import useUser from 'libs/useUser';

const Write = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });

  return user && user.isLoggedIn ? <WritePost mode="create" /> : <Loading />;
};

export default Write;
