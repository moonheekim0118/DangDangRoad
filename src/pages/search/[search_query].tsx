import React, { useCallback } from 'react';
import {
  useUser,
  useQueryReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/post';
import { REQUEST } from 'hooks/common/useApiFetch';
import Loading from 'components/ui/Loading';
import Modal from 'components/ui/Modal';

const SearchResult = () => {
  const { user } = useUser();
  const [
    allReviews,
    fetchReview,
    fetchRemove,
    fetchResult,
    hasMore,
    query,
  ] = useQueryReviews();
  const observerTarget = useIntersectionObserver({
    deps: [hasMore],
    fetcher: fetchReview,
  });
  const modalDatas = useSinglePostModal(allReviews);

  const removeHanlder = useCallback(
    (id: string) => () => {
      modalDatas.closeModal();
      fetchRemove(id);
    },
    []
  );

  return (
    <>
      <PostList
        isLoading={fetchResult.type === REQUEST}
        searchKeyword={query?.toString()}
        reviewData={allReviews}
        openSinglePost={modalDatas.openModal}
      />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalDatas.showModal}
        modalHandler={modalDatas.closeModal}>
        <SinglePost
          isModal={true}
          isLoading={modalDatas.fetchSingleReviewResult.type === REQUEST}
          data={modalDatas.singleReview}
          NavigationInfo={{
            hasPrev: modalDatas.index > 0,
            hasNext: modalDatas.index < allReviews.length - 1,
            prevHandler: modalDatas.prevHandler,
            nextHandler: modalDatas.nextHandler,
          }}
          removeHanlder={removeHanlder}
        />
      </Modal>
      <div ref={observerTarget}>
        {fetchResult.type === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchResult;
