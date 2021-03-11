import React, { useCallback } from 'react';
import { SinglePost, PostList } from 'components/post';
import { useSingleReview } from 'hooks';
import { REQUEST } from 'hooks/common/useApiFetch';
import { Button } from 'atoms';
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
      <SinglePost
        isLoading={fetchResult.type === REQUEST}
        isModal={false}
        data={singleReview}
      />
      <Button href={routes.SEARCH}>산책로 리뷰 더 보기</Button>
      <PostList
        reviewData={reviews.data.reviews}
        openSinglePost={openSinglePost}
      />
    </>
  );
};

export default singlePost;
