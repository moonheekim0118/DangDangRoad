import { useEffect } from 'react';
import { getReviewsFirst, getReviews } from 'api/review';
import useInfiniteData, {
  INIT,
  ADD,
  UPDATE,
  REMOVE,
} from 'hooks/data/useInfiniteData';
import useApiFetch, { REQUEST } from 'hooks/common/useApiFetch';
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

  const [getResult, getDispatch, getSetDefault] = useApiFetch<T.ReviewResult>(
    getReviews,
    {
      onSuccess: (response) => {
        getSetDefault();
        if (!response.data) return;
        const lastKey = response.data.lastKey;
        const newReviews = response.data.reviews;
        const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
        dispatch({
          type: UPDATE,
          data: {
            dataList: newReviews,
            lastKey,
            hasMore,
          },
        });
      },
      onFailure: (response) => {
        notiDispatch(Action.showError(response.error));
        getSetDefault();
      },
    }
  );

  const [
    getMoreResult,
    getMoreDispatch,
    getMoreSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviews, {
    onSuccess: (response) => {
      getMoreSetDefault();
      if (!response.data) return;
      const lastKey = response.data.lastKey;
      const newReviews = response.data.reviews;
      const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
      dispatch({
        type: UPDATE,
        data: {
          dataList: newReviews,
          lastKey,
          hasMore,
        },
      });
    },
    onFailure: (response) => {
      notiDispatch(Action.showError(response.error));
      getMoreSetDefault();
    },
  });

  const [
    getRecentResult,
    getRecentDispatch,
    getRecentSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviewsFirst, {
    onSuccess: (response) => {
      getRecentSetDefault();
      if (!response.data?.reviews) return;
      const newReviews = response.data.reviews;
      newReviews.length > 0 &&
        dispatch({
          type: ADD,
          data: {
            dataList: newReviews,
          },
        });
    },
    onFailure: (response) => {
      notiDispatch(Action.showError(response.error));
      getRecentSetDefault();
      return;
    },
  });

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
      getRecentDispatch({
        type: REQUEST,
        params: [cachedData.reviews[0].createdAt],
      });
    } else {
      getDispatch({ type: REQUEST });
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

  const handleFetchReview = () => {
    const fetchStatus = getResult.type;
    if (hasMore && fetchStatus !== REQUEST) {
      getMoreDispatch({ type: REQUEST, params: [lastKey] });
    }
  };

  const handleRemoveCache = (id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  };

  return [
    reviews,
    hasMore,
    lastKey,
    handleFetchReview,
    handleRemoveCache,
    getResult.type,
    getMoreResult.type,
  ] as const;
};

export default useAllReviews;
