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
    getReviewStatus,
    hasMore,
    lastKey,
  ] = useAllReviews();
  const observerTarget = useIntersectionObserver({
    deps: [hasMore, lastKey],
    fetcher: fetchReviewHanlder,
  });
  const modalDatas = useSinglePostModal(allReviews);

  const removeHanlder = useCallback(
    (id: string) => () => {
      modalDatas.closeModal(); // close Modal
      modalDatas.removeCache(id); // remove Cache
      fetchRemoveHanlder(id);
    },
    [modalDatas]
  );

  return (
    <>
      <PostList reviewData={allReviews} openSinglePost={modalDatas.openModal} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalDatas.showModal}
        modalHandler={modalDatas.closeModal}>
        <Card isModal={true}>
          {!modalDatas.singleReview ||
          modalDatas.fetchSingleReviewResult.type === REQUEST ||
          modalDatas.fetchSingleReviewResult.type === SUCCESS ? (
            <LoadingSinglePost />
          ) : (
            <SinglePost
              data={modalDatas.singleReview}
              NavigationInfo={{
                hasPrev: modalDatas.index > 0,
                hasNext: modalDatas.index < allReviews.length - 1,
                prevHandler: modalDatas.prevHandler,
                nextHandler: modalDatas.nextHandler,
              }}
              removeHanlder={removeHanlder}
            />
          )}
        </Card>
      </Modal>
      <div ref={observerTarget}>
        {getReviewStatus === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchMain;
