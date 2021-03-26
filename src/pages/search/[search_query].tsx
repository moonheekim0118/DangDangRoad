import React, { useCallback } from 'react';
import Head from 'next/head';
import {
  useUser,
  useQueryReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/Post';
import { REQUEST } from 'hooks/common/useApiFetch';
import { Loading, Card, Modal, LoadingSinglePost } from 'components/ui';

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
        <title>댕댕로드 | {query} 검색결과</title>
      </Head>
      <PostList
        searchKeyword={query?.toString()}
        reviewData={allReviews}
        openSinglePost={modalController.openModal}
      />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalController.showModal}
        modalHandler={modalController.closeModal}>
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
      <div ref={observerTarget}>
        {allReviewFetchStatus === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchResult;
