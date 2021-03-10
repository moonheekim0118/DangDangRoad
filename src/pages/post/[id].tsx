import React, { useCallback } from 'react';
import { SinglePost, PostList } from 'components/post';
import { useSingleReview } from 'hooks';
import { Button } from 'atoms';
import { getReviewsFirst } from 'api/review';
import { useUser } from 'hooks';
import routes from 'common/constant/routes';
import Loading from 'components/ui/Loading';
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
      {singleReview ? (
        <SinglePost isModal={false} data={singleReview} />
      ) : (
        <Loading />
      )}
      <Button href={routes.SEARCH}>산책로 리뷰 더 보기</Button>
      <PostList
        reviewData={reviews.data.reviews}
        openSinglePost={openSinglePost}
      />
    </>
  );
};

export default singlePost;
