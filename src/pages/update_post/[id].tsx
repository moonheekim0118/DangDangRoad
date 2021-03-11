import React, { useEffect } from 'react';
import { useUser } from 'hooks';
import { useSingleReview, useWarnUsavedChange } from 'hooks';
import { UpdatePost } from 'components/post';
import Loading from 'components/ui/Loading';
import routes from 'common/constant/routes';
import Router from 'next/router';

const updatePost = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const [singleReview] = useSingleReview(true);

  useWarnUsavedChange();

  useEffect(() => {
    if (user && singleReview && singleReview.userId !== user.userId) {
      Router.back();
    }
  }, [user, singleReview]);

  return !singleReview ? (
    <Loading />
  ) : (
    <UpdatePost initialData={singleReview} userId={user.userId} />
  );
};

export default updatePost;
