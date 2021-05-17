import React from 'react';
import Head from 'next/head';
import { useUser, useQueryReviews, useIntersectionObserver } from 'hooks';
import { REQUEST } from 'hooks/common/useApiFetch';
import { Loading } from 'components/UI';
import { LoaderContainer, MainLoaderContainer } from './index';
import dynamic from 'next/dynamic';

const WriteButton = dynamic(() => import('components/Post/WriteButton'));
const PostList = dynamic(() => import('components/Post/PostList'));
const EmptyState = dynamic(() => import('components/Common/EmptyState'));

const SearchResult = () => {
  const { user } = useUser();

  const [
    reviews,
    hasMore,
    fetchReviewHandler,
    removeCacheHandler,
    getReviewsStatus,
    getReviewMoreStatus,
    query,
  ] = useQueryReviews();

  const observerTarget = useIntersectionObserver({
    deps: [hasMore],
    fetcher: fetchReviewHandler,
  });

  return (
    <>
      <Head>
        <title>댕댕로드 | 검색결과</title>
        <meta
          property="og:title"
          content="댕댕로드 강아지 산책로 후기"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`강아지 산책로 후기`}
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
                searchKeyword={query?.toString()}
                reviewData={reviews}
                removeCacheFromDataHandler={removeCacheHandler}
              />
            </>
          ) : (
            <>{!hasMore && <EmptyState />}</>
          )}
        </>
      )}
      {user && user.isLoggedIn && <WriteButton />}
      <LoaderContainer ref={observerTarget}>
        {getReviewMoreStatus === REQUEST && <Loading size="medium" />}
      </LoaderContainer>
    </>
  );
};

export default SearchResult;
