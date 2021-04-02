import React from 'react';
import Head from 'next/head';
import { PostList } from 'components/Post';
import { useUser, useAllReviews, useIntersectionObserver } from 'hooks';
import { REQUEST } from 'hooks/common/useApiFetch';
import { Loading } from 'components/UI';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

const WriteButton = dynamic(() => import('components/Post/WriteButton'));

const SearchMain = () => {
  const { user } = useUser();

  const [
    allReviews,
    fetchReviewHanlder,
    removeCacheHandler,
    allReviewsFetchStatus,
    hasMore,
    lastKey,
  ] = useAllReviews();

  const observerTarget = useIntersectionObserver({
    deps: [hasMore, lastKey],
    fetcher: fetchReviewHanlder,
  });

  return (
    <>
      <Head>
        <title>댕댕로드 | 산책로 후기</title>
        <meta
          property="og:title"
          content="댕댕로드 강아지 산책로 후기"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="대한민국 전체 지역 강아지 산책로 후기"
          key="ogdesc"
        />
      </Head>
      <PostList
        reviewData={allReviews}
        removeCacheFromDataHandler={removeCacheHandler}
      />
      {user && user.isLoggedIn && <WriteButton />}
      <LoaderContainer ref={observerTarget}>
        {allReviewsFetchStatus === REQUEST && <Loading />}
      </LoaderContainer>
    </>
  );
};

export const LoaderContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 1.5rem;
`;

export default SearchMain;
