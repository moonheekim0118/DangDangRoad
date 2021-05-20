import React, { useEffect } from 'react';
import { useUser } from 'hooks';
import { useSingleReview, useWarnUsavedChange } from 'hooks';
import { Loading } from 'components/UI';
import dynamic from 'next/dynamic';
import routes from 'common/constant/routes';
import Router from 'next/router';

const UpdatePost = dynamic(
  () => import('components/Post/PostUpload/UpdatePost')
);

const updatePost = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const { fetchData, singleReview, handleUpdateCache } = useSingleReview();

  useWarnUsavedChange(routes.SEARCH);

  useEffect(() => {
    const postId = Router.query.id;
    typeof postId === 'string' && fetchData(postId);
  }, []);

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
      updateCache={handleUpdateCache}
    />
  );
};

export default updatePost;
