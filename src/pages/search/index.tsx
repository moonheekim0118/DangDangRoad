import React, { useState, useCallback } from 'react';
import { useModal } from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/Post';
import { reviewData } from 'types/API';
import Modal from 'components/Modal';
import useUser from 'libs/useUser';
import api from 'api';

export async function getStaticProps() {
  return {
    props: {
      reviews: await api.getReviewsFirst(),
    },
  };
}

const SearchMain = ({ reviews }) => {
  const { user } = useUser();
  const [lastKey, setLastKey] = useState<string>(reviews.data.lastKey);
  const [loadedReviews, setLoadedReviews] = useState<reviewData[]>(
    reviews.data.reviews
  ); // store review Data
  const [index, setIndex] = useState<number>(0);
  const [singlePost, setSinglePost] = useState<reviewData>(reviews.data);
  const [showSinglePostModal, singlePostModalHanlder] = useModal(false);

  // open Single Post Modal
  const openSinglePost = useCallback(
    (postId: string) => () => {
      window.history.replaceState(null, '', `/search/${postId}`);
      // find Specific Post by Id
      const idx = loadedReviews.findIndex((doc) => doc.docId === postId);
      if (idx !== -1) {
        setSinglePost(loadedReviews[idx]);
        setIndex(idx);
      }
      singlePostModalHanlder();
    },
    [loadedReviews, showSinglePostModal]
  );

  // close Modal
  const closeModal = useCallback(() => {
    window.history.replaceState(null, '', '/search');
    singlePostModalHanlder();
  }, [showSinglePostModal]);

  // move to prev Post in modal
  const prevHandler = useCallback(() => {
    const prevPostId = loadedReviews[index - 1].docId;
    setSinglePost(loadedReviews[index - 1]);
    setIndex(index - 1);
    window.history.replaceState(null, '', `/search/${prevPostId}`);
  }, [loadedReviews, index]);

  // move to next Post in modal
  const nextHandler = useCallback(() => {
    const nextPostId = loadedReviews[index + 1].docId;
    setSinglePost(loadedReviews[index + 1]);
    setIndex(index + 1);
    window.history.replaceState(null, '', `/search/${nextPostId}`);
  }, [loadedReviews, index]);

  return (
    <>
      <PostList reviewData={loadedReviews} openSinglePost={openSinglePost} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal showModal={showSinglePostModal} modalHandler={closeModal}>
        <SinglePost
          data={singlePost}
          NavigationInfo={{
            hasPrev: index > 0,
            hasNext: index < loadedReviews.length - 1,
            prevHandler,
            nextHandler,
          }}
        />
      </Modal>
    </>
  );
};

export default SearchMain;
