import React, { useEffect, useState, useCallback } from 'react';
import { SinglePost, PostList } from 'components/Post';
import { reviewData } from 'types/API';
import { Anchor } from 'atoms';
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
  // useEffect 에서 parmas 에 따라서 single Review 가져오기
  const [singlePost, setSinglePost] = useState<reviewData | undefined>();

  useEffect(() => {
    const postId = Router.query.id;
    if (typeof postId === 'string') {
      api.getReviewById(postId).then((result) => {
        if (!result.isError) {
          setSinglePost(result.data);
        }
      });
    }
  }, []);

  const openSinglePost = useCallback(
    (id: string) => () => {
      Router.push(`/search/${id}`);
    },
    []
  );

  return (
    <>
      {singlePost ? (
        <SinglePost data={singlePost} isModal={false} />
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
