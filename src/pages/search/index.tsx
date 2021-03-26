import React, { useCallback } from 'react';
import { WriteButton, PostList, SinglePost } from 'components/Post';
import {
  useUser,
  useAllReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { Loading, Card, LoadingSinglePost } from 'components/ui';
import { Modal } from 'components/ui';

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
      <PostList
        reviewData={allReviews}
        openSinglePost={modalController.openModal}
      />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalController.showModal}
        modalHandler={modalController.closeModal}>
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
      <div ref={observerTarget}>
        {allReviewsFetchStatus === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchMain;
