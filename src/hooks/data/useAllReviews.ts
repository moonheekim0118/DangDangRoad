import { useEffect, useState, useCallback } from 'react';
import { useApiFetch } from 'hooks';
import { getReviewsFirst, getReviews, removeReview } from 'api/review';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import cacheProto from 'util/cache';
import * as T from 'types/API';

interface DataType {
  /** reveiw lists */
  reviews: T.LightReviewData[];
  /** to continue infinite Scroll */
  lastKey: string;
  /** initial Key to get Recent datas */
  initialKey: string;
  /** infinite Scrolling */
  hasMore: boolean;
}

const CACHE = new cacheProto<DataType>();

const useAllReviews = () => {
  const [
    fetchReviewsResult,
    fetchReviewsDispatch,
    setReviewsDefault,
  ] = useApiFetch<T.ReviewResult>(getReviews);
  const [
    fetchRecentReviewsResult,
    fetchRecentReviewsDispatch,
    setRecentReviewsDefault,
  ] = useApiFetch<T.ReviewResult>(getReviewsFirst);
  const [
    fetchRemoveResult,
    fetchRemoveDispatch,
    setRemoveDefault,
  ] = useApiFetch<string>(removeReview);

  const [lastKey, setLastKey] = useState<string>('');
  const [allReviews, setAllReviews] = useState<T.LightReviewData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true); // let us know if there is more data to fetch in db

  useEffect(() => {
    // if there is Cached Data , we will call 'endBefore' API call and add Cached Data to it
    if (CACHE.has('general-search')) {
      const cachedData = CACHE.get('general-search');
      if (cachedData) {
        setAllReviews(cachedData.reviews);
        setLastKey(cachedData.lastKey);
        setHasMore(cachedData.hasMore);
        fetchRecentReviewsDispatch({
          type: REQUEST,
          params: [cachedData.initialKey],
        });
      }
    }
  }, []);

  useEffect(() => {
    switch (fetchRecentReviewsResult.type) {
      case SUCCESS:
        if (fetchRecentReviewsResult.data?.reviews) {
          const newReviews = fetchRecentReviewsResult.data.reviews;
          if (newReviews.length > 0) {
            const updatedReviews = fetchRecentReviewsResult.data.reviews.concat(
              allReviews
            );
            setAllReviews(updatedReviews);
            CACHE.set('general-search', {
              lastKey,
              reviews: updatedReviews,
              initialKey: newReviews[0].createdAt.toString(),
              hasMore,
            });
          }
        }
        setRecentReviewsDefault();
        break;
      case FAILURE:
    }
  }, [fetchRecentReviewsResult, allReviews, lastKey, hasMore]);

  useEffect(() => {
    switch (fetchReviewsResult.type) {
      case SUCCESS:
        if (fetchReviewsResult.data) {
          const newLastKey = fetchReviewsResult.data.lastKey;
          const newReviews = fetchReviewsResult.data.reviews;
          const updatedReviews = allReviews.concat(newReviews);
          const newHasMore = newReviews.length === REVIEW_DATA_LIMIT;
          setLastKey(newLastKey);
          setAllReviews(updatedReviews);
          setHasMore(newHasMore);
          CACHE.set('general-search', {
            lastKey: newLastKey,
            reviews: updatedReviews,
            initialKey: updatedReviews[0].createdAt.toString(),
            hasMore: newHasMore,
          });
        }
        setReviewsDefault();
        break;
      case FAILURE:
    }
  }, [fetchReviewsResult, allReviews]);

  useEffect(() => {
    switch (fetchRemoveResult.type) {
      case SUCCESS:
        const deletedId = fetchRemoveResult.data;
        const cachedData = CACHE.get('general-search');
        let updatedLastKey = cachedData?.lastKey || 0;
        const newReviews = allReviews.filter((v, i) => {
          if (v.docId === deletedId && v.createdAt === updatedLastKey) {
            updatedLastKey = allReviews[i - 1].createdAt;
          }
          return v.docId !== deletedId;
        });
        const updatedData = {
          ...cachedData,
          lastKey: updatedLastKey,
          reviews: newReviews,
        } as DataType;
        CACHE.set('general-search', updatedData);
        setAllReviews(newReviews);
        setRemoveDefault();
        break;
      case FAILURE:
    }
  }, [fetchRemoveResult, allReviews]);

  const fetchReview = useCallback(() => {
    if (hasMore) {
      fetchReviewsDispatch({ type: REQUEST, params: [lastKey] });
    }
  }, [allReviews, hasMore, lastKey]);

  // remove
  const fetchRemove = useCallback((id: string) => {
    fetchRemoveDispatch({ type: REQUEST, params: [id] });
  }, []);

  return [
    allReviews,
    fetchReview,
    fetchRemove,
    fetchReviewsResult,
    hasMore,
    lastKey,
  ] as const;
};

export default useAllReviews;
