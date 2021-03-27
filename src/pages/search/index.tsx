import React, { useCallback } from 'react';
import Head from 'next/head';
import { WriteButton, PostList } from 'components/Post';
import {
  useUser,
  useAllReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { Loading } from 'components/ui';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('components/ui/Modal'));
const Card = dynamic(() => import('components/ui/Card'));
const LoadingSinglePost = dynamic(
  () => import('components/ui/LoadingSinlgePost')
);
const SinglePost = dynamic(() => import('components/Post/SinglePost'));

const SearchMain = () => {
  const { user } = useUser();

  const [
    allReviews,
    fetchReviewHanlder,
    fetchRemoveHanlder,
    allReviewsFetchStatus,
    hasMore,
    lastKey,
  ] = useAllReviews();

  const observerTarget = useIntersectionObserver({
    deps: [hasMore, lastKey],
    fetcher: fetchReviewHanlder,
  });

  const modalController = useSinglePostModal(allReviews);

  const removeHanlder = useCallback(
    (id: string) => () => {
      modalController.closeModal(); // close Modal
      modalController.removeCache(id); // remove Cache
      fetchRemoveHanlder(id);
    },
    [modalController]
  );

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
        openSinglePost={modalController.openModal}
      />
      {user && user.isLoggedIn && <WriteButton />}
      {modalController.showModal && (
        <Modal modalHandler={modalController.closeModal}>
          <Card isModal={true}>
            {!modalController.singleReview ||
            modalController.singleReviewFetchStatus === REQUEST ||
            modalController.singleReviewFetchStatus === SUCCESS ? (
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
        {allReviewsFetchStatus === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchMain;
