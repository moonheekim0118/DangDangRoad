import React, { useCallback } from 'react';
import Head from 'next/head';
import { PostList } from 'components/Post';
import {
  useUser,
  useAllReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { Loading } from 'components/UI';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('components/UI/Modal'));
const Card = dynamic(() => import('components/UI/Card'));
const LoadingSinglePost = dynamic(
  () => import('components/UI/LoadingSinlgePost')
);
const WriteButton = dynamic(() => import('components/Post/WriteButton'));
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
