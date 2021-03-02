import React, { useState, useCallback } from 'react';
import { useModal, useFetchState, useInfiniteScroll } from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/Post';
import * as T from 'types/API';
import * as S from 'globalStyle/PostStyle';
import Loading from 'components/Loading';
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
  const [fetchState, setLoading, setDone, setError] = useFetchState();
  const [lastKey, setLastKey] = useState<string>(reviews.data.lastKey);
  const [loadedReviews, setLoadedReviews] = useState<T.lightReviewData[]>(
    reviews.data.reviews
  ); // store review Data
  const [index, setIndex] = useState<number>(0);
  const [singlePost, setSinglePost] = useState<T.reviewData>();
  const [showSinglePostModal, singlePostModalHanlder] = useModal(false);

  const fetchMutilplePost = useCallback(async () => {
    try {
      if (!fetchState.loading) {
        setLoading();
        const response = await api.getReviewsMore(lastKey);
        if (!response.isError) {
          setLastKey(response.data.lastKey);
          const reviews = loadedReviews.concat(response.data.reviews);
          setLoadedReviews(reviews);
          setDone();
        }
      }
    } catch (error) {
      setError(error);
    }
  }, [fetchState, loadedReviews, lastKey]);

  const fetchSinglePost = useCallback(async (postId: string) => {
    try {
      const response = await api.getReviewById(postId);
      if (!response.isError) {
        setSinglePost(response.data);
      }
    } catch (error) {}
  }, []);

  const [observerTarget] = useInfiniteScroll(fetchMutilplePost);

  // open Single Post Modal
  const openSinglePost = useCallback(
    (postId: string) => async () => {
      try {
        // change url
        window.history.replaceState(null, '', `/search/${postId}`);
        // find Specific Post by Id
        const idx = loadedReviews.findIndex((doc) => doc.docId === postId);
        if (idx !== -1) {
          // setSinglePost(loadedReviews[idx]);
          setIndex(idx);
        }
        await fetchSinglePost(postId);
        singlePostModalHanlder();
      } catch (error) {}
    },
    [loadedReviews, showSinglePostModal]
  );

  // close Modal
  const closeModal = useCallback(() => {
    window.history.replaceState(null, '', '/search');
    singlePostModalHanlder();
  }, [showSinglePostModal]);

  // move to prev Post in modal
  const prevHandler = useCallback(async () => {
    try {
      const prevPostId = loadedReviews[index - 1].docId;
      await fetchSinglePost(prevPostId);
      setIndex(index - 1);
      window.history.replaceState(null, '', `/search/${prevPostId}`);
    } catch (error) {}
  }, [loadedReviews, index]);

  // move to next Post in modal
  const nextHandler = useCallback(async () => {
    try {
      const nextPostId = loadedReviews[index + 1].docId;
      await fetchSinglePost(nextPostId);
      setIndex(index + 1);
      window.history.replaceState(null, '', `/search/${nextPostId}`);
    } catch (error) {}
  }, [loadedReviews, index]);

  return (
    <>
      <PostList reviewData={loadedReviews} openSinglePost={openSinglePost} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal showModal={showSinglePostModal} modalHandler={closeModal}>
        <S.SinglePostContainer isModal={true}>
          {singlePost ? (
            <SinglePost
              data={singlePost}
              NavigationInfo={{
                hasPrev: index > 0,
                hasNext: index < loadedReviews.length - 1,
                prevHandler,
                nextHandler,
              }}
            />
          ) : (
            <Loading />
          )}
        </S.SinglePostContainer>
      </Modal>
      <div ref={observerTarget}>{fetchState.loading && <Loading />}</div>
    </>
  );
};

export default SearchMain;
