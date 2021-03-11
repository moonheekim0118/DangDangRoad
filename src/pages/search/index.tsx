import React, { useCallback } from 'react';
import { WriteButton, PostList, SinglePost } from 'components/post';
import {
  useUser,
  useAllReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { REQUEST } from 'hooks/common/useApiFetch';
import Loading from 'components/ui/Loading';
import Modal from 'components/ui/Modal';
import { ReviewResult } from 'types/API';
import { getReviewsFirst } from 'api/review';
import LoadingSinlgeReview from 'components/ui/LoadingSinlgePost';

export async function getStaticProps() {
  return {
    props: {
      reviews: await getReviewsFirst(),
    },
  };
}

interface Props {
  reviews: { data: ReviewResult };
}

const SearchMain = ({ reviews }: Props) => {
  const { user } = useUser();
  const [
    allReviews,
    fetchReview,
    fetchRemove,
    fetchResult,
    hasMore,
  ] = useAllReviews({
    initReviews: reviews.data.reviews,
    initLastKey: reviews.data.lastKey,
  });
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
      <PostList reviewData={allReviews} openSinglePost={modalDatas.openModal} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalDatas.showModal}
        modalHandler={modalDatas.closeModal}>
        {modalDatas.singleReview ? (
          <SinglePost
            isModal={true}
            data={modalDatas.singleReview}
            NavigationInfo={{
              hasPrev: modalDatas.index > 0,
              hasNext: modalDatas.index < allReviews.length - 1,
              prevHandler: modalDatas.prevHandler,
              nextHandler: modalDatas.nextHandler,
            }}
            removeHanlder={removeHanlder}
          />
        ) : (
          <LoadingSinlgeReview isModal={true} />
        )}
      </Modal>
      <div ref={observerTarget}>
        {fetchResult.type === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchMain;
