import React, { useCallback } from 'react';
import { SinglePost } from 'components/Post';
import { useSingleReview } from 'hooks';
import { Link, Card, LoadingSinglePost } from 'components/ui';
import { useUser } from 'hooks';
import routes from 'common/constant/routes';

const singlePost = () => {
  useUser();
  const { singleReview, singleReviewFetchError } = useSingleReview(true);

  return singleReviewFetchError ? (
    <span>{singleReviewFetchError}</span>
  ) : (
    <>
      <Card isModal={false}>
        {singleReview ? (
          <SinglePost data={singleReview} />
        ) : (
          <LoadingSinglePost />
        )}
      </Card>
      <Link
        href={routes.SEARCH}
        align="center"
        theme="secondary"
        size="large"
        width="100%">
        산책로 리뷰 더 보기
      </Link>
    </>
  );
};

export default singlePost;
