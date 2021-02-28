import React, { useState, useCallback } from 'react';
import { useModal } from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/Post';
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
  const [data, setData] = useState(reviews.data); // store review Data
  const [singlePost, setSinglePost] = useState(reviews.data);
  const [showSinglePostModal, singlePostModalHanlder] = useModal(false);

  // open Single Post Modal
  const openSinglePost = useCallback(
    (postId: string) => () => {
      window.history.replaceState(null, '', `/search/${postId}`);
      // find Specific Post by Id
      const idx = data.reviews.findIndex((doc) => doc.docId === postId);
      if (idx !== -1) {
        setSinglePost(data.reviews[idx]);
      }
      singlePostModalHanlder();
    },
    [showSinglePostModal]
  );

  // close Modal
  const closeModal = useCallback(() => {
    window.history.replaceState(null, '', '/search');
    singlePostModalHanlder();
  }, [showSinglePostModal]);

  return (
    <>
      <PostList reviewData={data.reviews} openSinglePost={openSinglePost} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal showModal={showSinglePostModal} modalHandler={closeModal}>
        <SinglePost data={singlePost} />
      </Modal>
    </>
  );
};

export default SearchMain;
