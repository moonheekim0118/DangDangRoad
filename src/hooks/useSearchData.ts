import { useEffect, useRef, useState, useCallback } from 'react';
import { useFetchState, useModal, useSingleReviewFetch } from 'hooks';
import * as T from 'types/API';

interface Props {
  /** initial Review data from static props */
  initReviews?: T.lightReviewData[];
  /** initial last key data from static props */
  initLastKey?: string;
  /** api fetcher to get multiple reviews */
  fetcher: (key: string) => T.APIResponse;
  /** when modal close, go back to origin path */
  originPath: string;
}

const useSearchData = ({
  initReviews,
  initLastKey,
  fetcher,
  originPath,
}: Props) => {
  const observerTarget = useRef(null); // for infinite scrolling
  const [lastKey, setLastKey] = useState<string>(initLastKey || '');
  const [reviews, setReviews] = useState<T.lightReviewData[]>(
    initReviews || []
  );
  const [
    fetchMutipleReviewState,
    setLoading,
    setDone,
    setError,
  ] = useFetchState();
  const [showModal, modalHandler] = useModal(false);
  const [
    singleReview,
    fetchSingleReviewState,
    fetchSingleReview,
  ] = useSingleReviewFetch(false); // single Review which will be shown in modal
  const [index, setIndex] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true); // let us know if there is more data to fetch in db

  /** actual data fetch & store in state fucntion */
  const fetchMutipleReview = useCallback(async () => {
    try {
      if (!fetchMutipleReviewState.loading && hasMore) {
        setLoading();
        const response = await fetcher(lastKey);
        if (!response.isError) {
          setLastKey(response.data.lastKey);
          const newReviews = response.data.reviews;
          const mergedData = reviews.concat(response.data.reviews);
          setHasMore(newReviews.length === 8);
          setReviews(mergedData);
          setDone();
        } else {
          setError(response.error);
        }
      }
    } catch (error) {
      setError('잠시후 다시 시도해주세요');
    }
  }, [fetchMutipleReviewState, reviews, lastKey, hasMore]);

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        fetchMutipleReview();
      }
    },
    [hasMore, fetchMutipleReviewState]
  );

  useEffect(() => {
    let observer;
    if (observerTarget && observerTarget.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(observerTarget.current);
    }
    return () => observer && observer.disconnect();
  }, [observerTarget, hasMore, fetchMutipleReviewState]);

  // open Single Post Modal
  const openModal = useCallback(
    (postId: string) => async () => {
      try {
        // change url
        window.history.replaceState(null, '', `/search/${postId}`);
        // find Specific Post by Id
        const idx = reviews.findIndex((doc) => doc.docId === postId);
        if (idx !== -1) {
          setIndex(idx);
        }
        await fetchSingleReview(postId);
        modalHandler();
      } catch (error) {}
    },
    [reviews, showModal]
  );

  // close Modal
  const closeModal = useCallback(() => {
    window.history.replaceState(null, '', originPath);
    modalHandler();
  }, [showModal]);

  // move to prev Post in modal
  const prevHandler = useCallback(async () => {
    try {
      const prevPostId = reviews[index - 1].docId;
      await fetchSingleReview(prevPostId);
      setIndex(index - 1);
      window.history.replaceState(null, '', `/search/${prevPostId}`);
    } catch (error) {}
  }, [reviews, index]);

  // move to next Post in modal
  const nextHandler = useCallback(async () => {
    try {
      const nextPostId = reviews[index + 1].docId;
      await fetchSingleReview(nextPostId);
      setIndex(index + 1);
      window.history.replaceState(null, '', `/search/${nextPostId}`);
    } catch (error) {}
  }, [reviews, index]);

  return {
    reviews,
    index,
    fetchMutipleReviewState,
    showModal,
    modalHandler,
    singleReview,
    fetchSingleReviewState,
    fetchMutipleReview,
    openModal,
    closeModal,
    prevHandler,
    nextHandler,
    observerTarget,
  };
};

export default useSearchData;
