import { useEffect, useRef, useState, useCallback } from 'react';
import { useModal, useSingleReview } from 'hooks';
import useApiFetch, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import routes from 'common/constant/routes';
import Router from 'next/router';

import * as T from 'types/API';

interface Props {
  /** initial Review data from static props */
  initReviews?: T.lightReviewData[];
  /** initial last key data from static props */
  initLastKey?: string;
  /** api fetcher to get multiple reviews */
  fetcher: (key: string) => T.APIResponse<T.reviewResult>;
  /** when modal close, go back to origin path */
  originPath: string;
  /** does it needs initial fetch or not */
  initialFetch?: boolean;
}

const useSearchData = ({
  initReviews,
  initLastKey,
  fetcher,
  originPath,
  initialFetch = false,
}: Props) => {
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<T.reviewResult>(
    fetcher
  );
  const observerTarget = useRef(null); // for infinite scrolling
  const [lastKey, setLastKey] = useState<string>(initLastKey || '');
  const [reviews, setReviews] = useState<T.lightReviewData[]>(
    initReviews || []
  );

  const [showModal, modalHandler] = useModal(false);
  const [
    singleReview,
    fetchSingleReviewResult,
    fetchSingleReview,
  ] = useSingleReview(false); // single Review which will be shown in modal
  const [index, setIndex] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true); // let us know if there is more data to fetch in db
  const [keyword, setKeyword] = useState<string>(''); // search Keyword

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        if (fetchResult.data) {
          setLastKey(fetchResult.data.lastKey);
          const newReviews = fetchResult.data.reviews;
          setReviews(reviews.concat(newReviews));
          setHasMore(newReviews.length === REVIEW_DATA_LIMIT);
        }
        setDefault();
        break;
      case FAILURE:
    }
  }, [fetchResult, reviews]);

  /** actual data fetch & store in state fucntion */
  const fetchMutipleReview = useCallback(() => {
    if (hasMore) {
      initialFetch
        ? fetchDispatch({ type: REQUEST, params: [lastKey, keyword] })
        : fetchDispatch({ type: REQUEST, params: [lastKey] });
    }
  }, [reviews, lastKey, hasMore, keyword]);

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        fetchMutipleReview();
      }
    },
    [hasMore]
  );

  useEffect(() => {
    if (initialFetch) {
      const search_query = Router.query.search_query;
      if (typeof search_query === 'string') {
        setKeyword(search_query);
      }
    }
  }, []);

  useEffect(() => {
    let observer;
    if (observerTarget && observerTarget.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(observerTarget.current);
    }
    return () => observer && observer.disconnect();
  }, [observerTarget, hasMore]);

  // open Single Post Modal
  const openModal = useCallback(
    (postId: string) => async () => {
      try {
        // change url
        window.history.replaceState(null, '', `${routes.POST}/${postId}`);
        // find Specific Post by Id
        const idx = reviews.findIndex((doc) => doc.docId === postId);
        if (idx !== -1) {
          setIndex(idx);
        }
        fetchSingleReview(postId);
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
      fetchSingleReview(prevPostId);
      setIndex(index - 1);
      window.history.replaceState(null, '', `${routes.POST}/${prevPostId}`);
    } catch (error) {}
  }, [reviews, index]);

  // move to next Post in modal
  const nextHandler = useCallback(async () => {
    try {
      const nextPostId = reviews[index + 1].docId;
      fetchSingleReview(nextPostId);
      setIndex(index + 1);
      window.history.replaceState(null, '', `${routes.POST}/${nextPostId}`);
    } catch (error) {}
  }, [reviews, index]);

  return {
    reviews,
    index,
    showModal,
    fetchResult,
    modalHandler,
    singleReview,
    fetchSingleReviewResult,
    fetchMutipleReview,
    openModal,
    closeModal,
    prevHandler,
    nextHandler,
    observerTarget,
  };
};

export default useSearchData;
