import React, { useEffect, useCallback, useState } from 'react';
import { SinglePost, PostList } from 'components/Post';
import { useAPI } from 'hooks';
import { Anchor } from 'atoms';
import * as T from 'types/API';
import Loading from 'components/Loading';
import Router from 'next/router';
import api from 'api';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
  return {
    props: {
      reviews: await api.getReviewsFirst(),
    },
  };
}

const singlePost = ({ reviews }) => {
  const [sendRequest, responseState] = useAPI(T.APITypes.GET_REVIEW_BY_ID);
  const [singleReview, setSingleReview] = useState<T.reviewData>();

  useEffect(() => {
    const postId = Router.query.id;
    if (typeof postId === 'string') {
      sendRequest(postId).then((data) => setSingleReview(data));
    }
  }, []);

  const openSinglePost = useCallback(
    (id: string) => () => {
      Router.push(`/search/${id}`);
    },
    []
  );

  return responseState.error ? (
    <span>{responseState.error}</span>
  ) : (
    <>
      {singleReview ? (
        <SinglePost data={singleReview} isModal={false} />
      ) : (
        <Loading />
      )}
      <Anchor fontsize={1} path="/search">
        산책로 리뷰 더 보기
      </Anchor>
      <PostList
        reviewData={reviews.data.reviews}
        openSinglePost={openSinglePost}
      />
    </>
  );
};

export default singlePost;
