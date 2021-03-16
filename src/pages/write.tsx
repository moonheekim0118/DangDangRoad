import React from 'react';
import { WritePost } from 'components/post/PostUpload';
import { useUser, useWarnUsavedChange } from 'hooks';
import { Loading } from 'components/ui';
import routes from 'common/constant/routes';

const Write = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  useWarnUsavedChange(routes.SEARCH);
  return user && user.isLoggedIn ? (
    <WritePost userId={user.userId} />
  ) : (
    <Loading />
  );
};

export default Write;
