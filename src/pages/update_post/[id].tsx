import React, { useEffect } from 'react';
import { useUser } from 'hooks';
import { useSingleReview } from 'hooks';
import { WritePost } from 'components/post';
import Loading from 'components/ui/Loading';
import routes from 'common/constant/routes';
import Router from 'next/router';

const UpdatePost = () => {
  const { user } = useUser({ redirectTo: routes.LOGIN });
  const [singleReview, fetchResult, fetchData] = useSingleReview(true);

  useEffect(() => {
    if (user && singleReview && singleReview.userId !== user.userId) {
      Router.back();
    }
  }, [user, singleReview]);

  return !singleReview ? (
    <Loading />
  ) : (
    <WritePost mode="update" initialData={singleReview} />
  );
};

export default UpdatePost;
