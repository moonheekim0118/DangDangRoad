import { useEffect } from 'react';
import Head from 'next/head';
import { useSingleReview, useUser } from 'hooks';
import { Link, Card, LoadingSinglePost } from 'components/UI';
import routes from 'common/constant/routes';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const SinglePost = dynamic(() => import('components/Post/SinglePost'));

const singlePost = () => {
  useUser();
  const {
    fetchData,
    singleReview,
    handleRemoveCache,
    singleReviewFetchError,
  } = useSingleReview();

  useEffect(() => {
    const postId = Router.query.id;
    typeof postId === 'string' && fetchData(postId);
  }, []);

  const handleRemove = (id: string) => {
    handleRemoveCache(id);
    Router.push(routes.SEARCH);
  };

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
          <SinglePost data={singleReview} handleRemove={handleRemove} />
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
