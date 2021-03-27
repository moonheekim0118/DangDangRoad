import React from 'react';
import Head from 'next/head';
import { useSingleReview } from 'hooks';
import { Link, Card, LoadingSinglePost } from 'components/ui';
import { useUser } from 'hooks';
import routes from 'common/constant/routes';
import dynamic from 'next/dynamic';

const SinglePost = dynamic(() => import('components/Post/SinglePost'));

const singlePost = () => {
  useUser();
  const { singleReview, singleReviewFetchError } = useSingleReview(true);

  return singleReviewFetchError ? (
    <span>{singleReviewFetchError}</span>
  ) : (
    <>
      <Head>
        <title>댕댕로드 | 산책로 후기 상세보기</title>
        <meta
          property="og:title"
          content="댕댕로드 강아지 산책로 후기 상세보기"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="강아지 산책로 후기"
          key="ogdesc"
        />
      </Head>
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
    </>
  );
};

export default singlePost;
