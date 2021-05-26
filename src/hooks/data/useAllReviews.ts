import { useEffect } from 'react';
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

  const [getResult, getDispatch, getSetDefault] = useApiFetch<T.ReviewResult>(
    getReviews
  );

  const [
    getMoreResult,
    getMoreDispatch,
    getMoreSetDefault,
  ] = useApiFetch<T.ReviewResult>(getReviews);

  const [
    getRecentResult,
    getRecentDispatch,
    getRecentSetDefault,
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

  useEffect(() => {
    switch (getRecentResult.type) {
      case SUCCESS:
        getRecentSetDefault();
        if (!getRecentResult.data?.reviews) return;
        const newReviews = getRecentResult.data.reviews;
        newReviews.length > 0 &&
          dispatch({
            type: ADD,
            data: {
              dataList: newReviews,
            },
          });
        return;
      case FAILURE:
        notiDispatch(Action.showError(getRecentResult.error));
        getRecentSetDefault();
        return;
    }
  }, [getRecentResult]);

  useEffect(() => {
    switch (getResult.type) {
      case SUCCESS:
        getSetDefault();
        if (!getResult.data) return;
        const lastKey = getResult.data.lastKey;
        const newReviews = getResult.data.reviews;
        const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
        dispatch({
          type: UPDATE,
          data: {
            dataList: newReviews,
            lastKey,
            hasMore,
          },
        });
        return;
      case FAILURE:
        notiDispatch(Action.showError(getResult.error));
        getSetDefault();
        return;
    }
  }, [getResult]);

  useEffect(() => {
    switch (getMoreResult.type) {
      case SUCCESS:
        getMoreSetDefault();
        if (!getMoreResult.data) return;
        const lastKey = getMoreResult.data.lastKey;
        const newReviews = getMoreResult.data.reviews;
        const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
        dispatch({
          type: UPDATE,
          data: {
            dataList: newReviews,
            lastKey,
            hasMore,
          },
        });
        return;
      case FAILURE:
        notiDispatch(Action.showError(getMoreResult.error));
        getMoreSetDefault();
        return;
    }
  }, [getMoreResult]);

  const handleFetchReview = () => {
    const fetchStatus = getResult.type;
    if (hasMore && fetchStatus !== REQUEST && fetchStatus !== SUCCESS) {
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
