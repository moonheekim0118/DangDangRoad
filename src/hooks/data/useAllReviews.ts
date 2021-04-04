import { useEffect, useState, useCallback, useRef } from 'react';
import { getReviewsFirst, getReviews } from 'api/review';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { useNotificationDispatch } from 'context/Notification';
import { LightReview } from 'types/Review';
import cacheProto from 'util/cache';
import * as Action from 'action';
import * as T from 'types/API';

interface DataType {
  /** reveiw lists */
  reviews: LightReview[];
  /** to continue infinite Scroll */
  lastKey: string;
  /** initial Key to get Recent datas */
  initialKey: string;
  /** infinite Scrolling */
  hasMore: boolean;
}

const CACHE = new cacheProto<DataType>();

const useAllReviews = () => {
  const notiDispatch = useNotificationDispatch();
  const [
    getReviewsResult,
    getReviewsFetch,
    getReviewsSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviews);
  const [
    recentReviewsResult,
    recentReviewsFetch,
    recentReviewsSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviewsFirst);

  const [lastKey, setLastKey] = useState<string>('');
  const [allReviews, setAllReviews] = useState<LightReview[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true); // let us know if there is more data to fetch in db
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    // if there is Cached Data , we will call 'endBefore' API call and add Cached Data to it
    if (CACHE.has('general-search')) {
      const cachedData = CACHE.get('general-search');
      if (cachedData) {
        setAllReviews(cachedData.reviews);
        setLastKey(cachedData.lastKey);
        setHasMore(cachedData.hasMore);
        recentReviewsFetch({
          type: REQUEST,
          params: [cachedData.initialKey],
        });
      }
    }
    isMounted.current = true;
  }, []);

  useEffect(() => {
    switch (recentReviewsResult.type) {
      case SUCCESS:
        if (recentReviewsResult.data?.reviews) {
          const newReviews = recentReviewsResult.data.reviews;
          if (newReviews.length > 0) {
            const updatedReviews = recentReviewsResult.data.reviews.concat(
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
        recentReviewsSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(recentReviewsResult.error));
        recentReviewsSetDefault();
    }
  }, [recentReviewsResult, allReviews, lastKey, hasMore]);

  useEffect(() => {
    switch (getReviewsResult.type) {
      case SUCCESS:
        if (getReviewsResult.data) {
          const newLastKey = getReviewsResult.data.lastKey;
          const newReviews = getReviewsResult.data.reviews;
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
        getReviewsSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsResult.error));
        getReviewsSetDefault();
    }
  }, [getReviewsResult, allReviews]);

  const fetchReviewHanlder = useCallback(() => {
    if (hasMore && isMounted.current) {
      getReviewsFetch({ type: REQUEST, params: [lastKey] });
    }
  }, [allReviews, hasMore, lastKey]);

  const removeCacheHandler = useCallback(
    (id: string) => {
      const cachedData = CACHE.get('general-search');
      let updatedLastKey = cachedData?.lastKey || 0;
      const newReviews = allReviews.filter((v, i) => {
        if (v.docId === id && v.createdAt === updatedLastKey) {
          updatedLastKey = allReviews[i - 1].createdAt;
        }
        return v.docId !== id;
      });

      const updatedData = {
        ...cachedData,
        lastKey: updatedLastKey,
        reviews: newReviews,
      } as DataType;
      CACHE.set('general-search', updatedData);
      setAllReviews(newReviews);
    },
    [allReviews]
  );

  return [
    allReviews,
    fetchReviewHanlder,
    removeCacheHandler,
    getReviewsResult.type,
    hasMore,
    lastKey,
  ] as const;
};

export default useAllReviews;
