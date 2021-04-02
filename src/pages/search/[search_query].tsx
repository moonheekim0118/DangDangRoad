import React from 'react';
import Head from 'next/head';
import { useUser, useQueryReviews, useIntersectionObserver } from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { Loading } from 'components/UI';
import { LoaderContainer } from './index';
import dynamic from 'next/dynamic';

const WriteButton = dynamic(() => import('components/Post/WriteButton'));
const PostList = dynamic(() => import('components/Post/PostList'));

const SearchResult = () => {
  const { user } = useUser();

  const [
    allReviews,
    fetchReviewHandler,
    removeCacheHandler,
    allReviewsFetchStatus,
    hasMore,
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
      {allReviews.length > 0 ? (
        <PostList
          searchKeyword={query?.toString()}
          reviewData={allReviews}
          removeCacheFromDataHandler={removeCacheHandler}
        />
      ) : (
        <>{!hasMore && <h1>아직 작성된 리뷰가 없습니다</h1>}</>
      )}
      {user && user.isLoggedIn && <WriteButton />}
      <LoaderContainer ref={observerTarget}>
        {allReviewsFetchStatus === REQUEST && <Loading />}
      </LoaderContainer>
    </>
  );
};

export default SearchResult;
