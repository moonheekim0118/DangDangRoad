import { useEffect, useCallback } from 'react';
import { getReviewsFirst, getReviews } from 'api/review';
import useInfiniteData, {
  INIT,
  ADD,
  UPDATE,
  REMOVE,
} from 'hooks/data/useInfiniteData';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { useNotificationDispatch } from 'context/Notification';
import { useRouter } from 'next/router';
import { LightReview } from 'types/Review';
import cacheProto from 'util/cache';
import * as Action from 'action';
import * as T from 'types/API';

interface DataType {
  /** reveiw lists */
  reviews: LightReview[];
  /** to continue infinite Scroll */
  lastKey: number;
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
    getReviewsMoreResult,
    getReviewsMoreFetch,
    getReviewsMoreSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviews);

  const [
    recentReviewsResult,
    recentReviewsFetch,
    recentReviewsSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviewsFirst);

  const router = useRouter();
  const pathName = router.asPath;
  const { result, dispatch, setDefault } = useInfiniteData<LightReview>();
  const { type, dataList: reviews, hasMore, lastKey } = result;

  useEffect(() => {
    // if there is Cached Data , we will call 'endBefore' API call and add Cached Data to it
    if (CACHE.has(pathName)) {
      const cachedData = CACHE.get(pathName);
      if (cachedData) {
        dispatch({
          type: INIT,
          data: {
            dataList: cachedData.reviews,
            lastKey: cachedData.lastKey,
            hasMore: cachedData.hasMore,
          },
        });
        recentReviewsFetch({
          type: REQUEST,
          params: [cachedData.reviews[0].createdAt],
        });
      }
    } else {
      getReviewsFetch({ type: REQUEST });
    }
  }, []);

  useEffect(() => {
    if (type === REMOVE || type === UPDATE || type === ADD) {
      CACHE.set(
        pathName,
        {
          reviews,
          lastKey,
          hasMore,
        },
        reviews.length
      );
      setDefault();
    }
  }, [result]);

  useEffect(() => {
    switch (recentReviewsResult.type) {
      case SUCCESS:
        if (recentReviewsResult.data?.reviews) {
          const newReviews = recentReviewsResult.data.reviews;
          if (reviews.length > 0) {
            dispatch({
              type: ADD,
              data: {
                dataList: newReviews,
              },
            });
          }
        }
        recentReviewsSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(recentReviewsResult.error));
        recentReviewsSetDefault();
    }
  }, [recentReviewsResult]);

  useEffect(() => {
    switch (getReviewsResult.type) {
      case SUCCESS:
        if (getReviewsResult.data) {
          const lastKey = getReviewsResult.data.lastKey;
          const newReviews = getReviewsResult.data.reviews;
          const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
          dispatch({
            type: UPDATE,
            data: {
              dataList: newReviews,
              lastKey,
              hasMore,
            },
          });
        }
        getReviewsMoreSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsResult.error));
        getReviewsMoreSetDefault();
    }
  }, [getReviewsResult]);

  useEffect(() => {
    switch (getReviewsMoreResult.type) {
      case SUCCESS:
        if (getReviewsMoreResult.data) {
          const lastKey = getReviewsMoreResult.data.lastKey;
          const newReviews = getReviewsMoreResult.data.reviews;
          const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
          dispatch({
            type: UPDATE,
            data: {
              dataList: newReviews,
              lastKey,
              hasMore,
            },
          });
        }
        getReviewsSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsMoreResult.error));
        getReviewsSetDefault();
    }
  }, [getReviewsMoreResult]);

  const fetchReviewHanlder = useCallback(() => {
    if (hasMore) {
      getReviewsMoreFetch({ type: REQUEST, params: [lastKey] });
    }
  }, [hasMore, lastKey]);

  const removeCacheHandler = useCallback((id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  }, []);

  return [
    reviews,
    hasMore,
    lastKey,
    fetchReviewHanlder,
    removeCacheHandler,
    getReviewsResult.type,
    getReviewsMoreResult.type,
  ] as const;
};

export default useAllReviews;
