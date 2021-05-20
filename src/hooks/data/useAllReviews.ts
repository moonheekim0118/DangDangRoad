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
    getRecentReviewSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviewsFirst);

  const router = useRouter();
  const pathName = router.asPath;
  const { result, dispatch, setDefault } = useInfiniteData<LightReview>();
  const { type, dataList: reviews, hasMore, lastKey } = result;

  useEffect(() => {
    if (reviews.length > 0) return;
    if (CACHE.has(pathName)) {
      const cachedData = CACHE.get(pathName);
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
          newReviews.length > 0 &&
            dispatch({
              type: ADD,
              data: {
                dataList: newReviews,
              },
            });
        }
        getRecentReviewSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(recentReviewsResult.error));
        getRecentReviewSetDefault();
        break;
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
          getReviewsSetDefault();
        }
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsResult.error));
        getReviewsSetDefault();
        break;
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
        getReviewsMoreSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsMoreResult.error));
        getReviewsMoreSetDefault();
        break;
    }
  }, [getReviewsMoreResult]);

  const handleFetchReview = useCallback(() => {
    const fetchStatus = getReviewsResult.type;
    if (hasMore && fetchStatus !== REQUEST && fetchStatus !== SUCCESS) {
      getReviewsMoreFetch({ type: REQUEST, params: [lastKey] });
    }
  }, [hasMore, lastKey, getReviewsResult]);

  const handleRemoveCache = useCallback((id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  }, []);

  return [
    reviews,
    hasMore,
    lastKey,
    handleFetchReview,
    handleRemoveCache,
    getReviewsResult.type,
    getReviewsMoreResult.type,
  ] as const;
};

export default useAllReviews;
