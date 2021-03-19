import React, { useCallback } from 'react';
import { SinglePost, PostList } from 'components/Post';
import { useSingleReview } from 'hooks';
import { Link, Card, LoadingSinglePost } from 'components/ui';
import { getReviewsFirst } from 'api/review';
import { useUser } from 'hooks';
import routes from 'common/constant/routes';
import Router from 'next/router';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
  return {
    props: {
      reviews: await getReviewsFirst(),
    },
  };
}

const singlePost = ({ reviews }) => {
  const { user } = useUser();
  const [singleReview, fetchResult] = useSingleReview(true);

  const openSinglePost = useCallback(
    (id: string) => () => {
      Router.push(`${routes.POST}/${id}`);
    },
    []
  );

  return fetchResult.error ? (
    <span>{fetchResult.error}</span>
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
      <PostList
        reviewData={reviews.data.reviews}
        openSinglePost={openSinglePost}
      />
    </>
  );
};

export default singlePost;
