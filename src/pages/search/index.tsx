import React from 'react';
import { REQUEST } from 'hooks/common/useApiFetch';
import { useUser, useAllReviews, useIntersectionObserver } from 'hooks';
import { Loading } from 'components/UI';
import Head from 'next/head';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

const WriteButton = dynamic(() => import('components/Post/WriteButton'));
const PostList = dynamic(() => import('components/Post/PostList'));
const EmptyState = dynamic(() => import('components/Common/EmptyState'));

const SearchMain = () => {
  const { user } = useUser();

  const [
    reviews,
    hasMore,
    lastKey,
    fetchReviewHanlder,
    removeCacheHandler,
    getReviewsStatus,
    getReviewsMoreStatus,
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
      {getReviewsStatus === REQUEST ? (
        <MainLoaderContainer>
          <Loading />
        </MainLoaderContainer>
      ) : (
        <>
          {reviews.length > 0 ? (
            <>
              <PostList
                reviewData={reviews}
                removeCacheFromDataHandler={removeCacheHandler}
              />
              <LoaderContainer ref={observerTarget}>
                {getReviewsMoreStatus === REQUEST && <Loading size="medium" />}
              </LoaderContainer>
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
      {user && user.isLoggedIn && <WriteButton />}
    </>
  );
};

export const LoaderContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin-top: 10px;
  background-color: inherit;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 1.5rem;
`;

export const MainLoaderContainer = styled.div`
  width: 100%;
  height: 110vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
`;

export default SearchMain;
