import React, { useEffect } from 'react';
import useUser from 'libs/useUser';
import { useSingleReview } from 'hooks';
import { WritePost } from 'components/Post';
import Loading from 'components/Loading';
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
