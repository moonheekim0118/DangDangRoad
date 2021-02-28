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
  const [index, setIndex] = useState<number>(0);
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
        setIndex(idx);
      }
      singlePostModalHanlder();
    },
    [data, showSinglePostModal]
  );

  // close Modal
  const closeModal = useCallback(() => {
    window.history.replaceState(null, '', '/search');
    singlePostModalHanlder();
  }, [showSinglePostModal]);

  const goPrevHandler = useCallback(() => {
    const prevPostId = data.reviews[index - 1].docId;
    setSinglePost(data.reviews[index - 1]);
    setIndex(index - 1);
    window.history.replaceState(null, '', `/search/${prevPostId}`);
  }, [data, index]);

  const goNextHandler = useCallback(() => {
    const nextPostId = data.reviews[index + 1].docId;
    setSinglePost(data.reviews[index + 1]);
    setIndex(index + 1);
    window.history.replaceState(null, '', `/search/${nextPostId}`);
  }, [data, index]);

  return (
    <>
      <PostList reviewData={data.reviews} openSinglePost={openSinglePost} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal showModal={showSinglePostModal} modalHandler={closeModal}>
        <SinglePost
          data={singlePost}
          hasPrev={index > 0}
          hasNext={index < data.reviews.length - 1}
          goToPrevHandler={goPrevHandler}
          goToNextHandler={goNextHandler}
        />
      </Modal>
    </>
  );
};

export default SearchMain;
