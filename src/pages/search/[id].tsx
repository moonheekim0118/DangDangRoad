import React, { useEffect, useCallback, useState } from 'react';
import { SinglePost, PostList } from 'components/Post';
import { useFetchState } from 'hooks';
import { Anchor } from 'atoms';
import * as T from 'types/API';
import * as S from 'globalStyle/PostStyle';
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
  const [fetchState, setLoading, setDone, setError] = useFetchState();
  const [singleReview, setSingleReview] = useState<T.reviewData>();

  useEffect(() => {
    const postId = Router.query.id;
    if (typeof postId === 'string') {
      setLoading();
      api
        .getReviewById(postId)
        .then((result) => {
          if (!result.isError) {
            setSingleReview(result.data);
            setDone();
          } else {
            setError(result.error);
          }
        })
        .catch((error) => setError('잠시후 다시 시도해주세요'));
    }
  }, []);

  const openSinglePost = useCallback(
    (id: string) => () => {
      Router.push(`/search/${id}`);
    },
    []
  );

  return fetchState.error ? (
    <span>{fetchState.error}</span>
  ) : (
    <>
      <S.SinglePostContainer isModal={false}>
        {singleReview ? <SinglePost data={singleReview} /> : <Loading />}
      </S.SinglePostContainer>
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
