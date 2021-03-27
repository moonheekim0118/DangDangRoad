import React, { useCallback } from 'react';
import Head from 'next/head';
import {
  useUser,
  useQueryReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { WriteButton } from 'components/Post';
import { REQUEST } from 'hooks/common/useApiFetch';
import { Loading } from 'components/ui';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('components/ui/Modal'));
const Card = dynamic(() => import('components/ui/Card'));
const LoadingSinglePost = dynamic(
  () => import('components/ui/LoadingSinlgePost')
);
const PostList = dynamic(() => import('components/Post/PostList'));
const SinglePost = dynamic(() => import('components/Post/SinglePost'));

const SearchResult = () => {
  const { user } = useUser();

  const [
    allReviews,
    fetchReviewHandler,
    fetchRemoveHandler,
    allReviewFetchStatus,
    hasMore,
    query,
  ] = useQueryReviews();

  const observerTarget = useIntersectionObserver({
    deps: [hasMore],
    fetcher: fetchReviewHandler,
  });
  const modalController = useSinglePostModal(allReviews);

  const removeHanlder = useCallback(
    (id: string) => () => {
      modalController.closeModal();
      modalController.removeCache(id); // remove Cache
      fetchRemoveHandler(id);
    },
    [modalController]
  );

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
          openSinglePost={modalController.openModal}
        />
      ) : (
        <h1>아직 작성된 리뷰가 없습니다</h1>
      )}
      {user && user.isLoggedIn && <WriteButton />}
      {modalController.showModal && (
        <Modal modalHandler={modalController.closeModal}>
          <Card isModal={true}>
            {!modalController.singleReview ||
            modalController.singleReviewFetchStatus === REQUEST ? (
              <LoadingSinglePost />
            ) : (
              <SinglePost
                data={modalController.singleReview}
                NavigationInfo={{
                  hasPrev: modalController.index > 0,
                  hasNext: modalController.index < allReviews.length - 1,
                  prevHandler: modalController.prevHandler,
                  nextHandler: modalController.nextHandler,
                }}
                removeHanlder={removeHanlder}
              />
            )}
          </Card>
        </Modal>
      )}
      <div ref={observerTarget}>
        {allReviewFetchStatus === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchResult;
