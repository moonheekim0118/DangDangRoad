import React, { useEffect } from 'react';
import { useUser } from 'hooks';
import { useSingleReview, useWarnUsavedChange } from 'hooks';
import { UpdatePost } from 'components/Post/PostUpload';
import { Loading } from 'components/ui';
import routes from 'common/constant/routes';
import Router from 'next/router';

const updatePost = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const [singleReview] = useSingleReview(true);

  useWarnUsavedChange(routes.SEARCH);

  useEffect(() => {
    if (user && singleReview && singleReview.userId !== user.userId) {
      Router.back();
    }
  }, [user, singleReview]);

  return !singleReview || !user ? (
    <Loading />
  ) : (
    <UpdatePost initialData={singleReview} userId={user.userId} />
  );
};

export default updatePost;
