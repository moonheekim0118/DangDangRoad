import React from 'react';
import { useSearchData } from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/Post';
import * as S from 'globalStyle/PostStyle';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import useUser from 'libs/useUser';
import routes from 'common/constant/routes';
import { getReviewsMore, getReviewsFirst } from 'api/review';

export async function getStaticProps() {
  return {
    props: {
      reviews: await getReviewsFirst(),
    },
  };
}

const SearchMain = ({ reviews }) => {
  const { user } = useUser();

  const data = useSearchData({
    initReviews: reviews.data.reviews,
    initLastKey: reviews.data.lastKey,
    fetcher: getReviewsMore,
    originPath: routes.SEARCH,
  });

  return (
    <>
      <PostList reviewData={data.reviews} openSinglePost={data.openModal} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal showModal={data.showModal} modalHandler={data.closeModal}>
        <S.SinglePostContainer isModal={true}>
          {data.singleReview ? (
            <SinglePost
              data={data.singleReview}
              NavigationInfo={{
                hasPrev: data.index > 0,
                hasNext: data.index < data.reviews.length - 1,
                prevHandler: data.prevHandler,
                nextHandler: data.nextHandler,
              }}
            />
          ) : (
            <Loading />
          )}
        </S.SinglePostContainer>
      </Modal>
      <div ref={data.observerTarget}>
        {data.fetchResult.type === 'REQEUST' && <Loading />}
      </div>
    </>
  );
};

export default SearchMain;
