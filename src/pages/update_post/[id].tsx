import React, { useEffect } from 'react';
import { useUser } from 'hooks';
import { useSingleReview, useWarnUsavedChange } from 'hooks';
import { Loading } from 'components/ui';
import dynamic from 'next/dynamic';
import routes from 'common/constant/routes';
import Router from 'next/router';

const UpdatePost = dynamic(
  () => import('components/Post/PostUpload/UpdatePost')
);

const updatePost = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const { singleReview, updateCache } = useSingleReview(true);

  useWarnUsavedChange(routes.SEARCH);

  useEffect(() => {
    if (user && singleReview && singleReview.userId !== user.userId) {
      Router.back();
    }
  }, [user, singleReview]);

  return !singleReview || !user ? (
    <Loading />
  ) : (
    <UpdatePost
      initialData={singleReview}
      userId={user.userId}
      updateCache={updateCache}
    />
  );
};

export default updatePost;
