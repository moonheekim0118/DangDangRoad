import { useEffect, useCallback } from 'react';
import useInfiniteData, {
  INIT,
  UPDATE,
  REMOVE,
} from 'hooks/data/useInfiniteData';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { useRouter } from 'next/router';
import { useNotificationDispatch } from 'context/Notification';
import { LightReview } from 'types/Review';
import cacheProto from 'util/cache';
import searchByKeyword from 'api/search';
import * as Action from 'action';

interface DataType {
  /** reveiw lists */
  reviews: LightReview[];
  /** infinite Scrolling */
  hasMore: boolean;
}

const CACHE = new cacheProto<DataType>();

const useQueryReviews = () => {
  const notiDispatch = useNotificationDispatch();
  const router = useRouter();
  const pathName = router.asPath;
  const query = router.query.search_query as string;
  const { result, dispatch, setDefault } = useInfiniteData<LightReview>();
  const { type, dataList: reviews, hasMore } = result;

  const [getReviewsResult, getReviewsFetch, getReviewsSetDefault] = useApiFetch<
    LightReview[]
  >(searchByKeyword);

  const [
    getReviewsMoreResult,
    getReviewsMoreFetch,
    getReviewsMoreSetDefault,
  ] = useApiFetch<LightReview[]>(searchByKeyword);

  useEffect(() => {
    const cachedData = CACHE.get(pathName);
    if (CACHE.has(pathName) && cachedData) {
      dispatch({
        type: INIT,
        data: {
          dataList: cachedData.reviews,
          hasMore: cachedData.hasMore,
        },
      });
    } else {
      reviews.length === 0 &&
        getReviewsFetch({ type: REQUEST, params: [query] });
    }
  }, []);

  useEffect(() => {
    if (type === UPDATE || type === REMOVE) {
      CACHE.set(
        pathName,
        {
          reviews,
          hasMore,
        },
        reviews.length
      );
      setDefault();
    }
  }, [result]);

  useEffect(() => {
    switch (getReviewsResult.type) {
      case SUCCESS:
        if (getReviewsResult.data) {
          const newReviews = getReviewsResult.data;
          const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
          dispatch({ type: UPDATE, data: { dataList: newReviews, hasMore } });
        }
        getReviewsSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsResult.error));
        getReviewsSetDefault();
    }
  }, [getReviewsResult]);

  useEffect(() => {
    switch (getReviewsMoreResult.type) {
      case SUCCESS:
        if (getReviewsMoreResult.data) {
          const newReviews = getReviewsMoreResult.data;
          const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
          dispatch({ type: UPDATE, data: { dataList: newReviews, hasMore } });
        }
        getReviewsMoreSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsMoreResult.error));
        getReviewsMoreSetDefault();
    }
  }, [getReviewsMoreResult]);

  const fetchReviewHandler = useCallback(() => {
    const fetchStatus = getReviewsResult.type;
    if (
      hasMore &&
      query &&
      fetchStatus !== REQUEST &&
      fetchStatus !== SUCCESS
    ) {
      getReviewsMoreFetch({ type: REQUEST, params: [query] });
    }
  }, [hasMore, query, getReviewsResult]);

  const removeCacheHandler = useCallback((id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  }, []);

  return [
    reviews,
    hasMore,
    fetchReviewHandler,
    removeCacheHandler,
    getReviewsResult.type,
    getReviewsMoreResult.type,
    query,
  ] as const;
};

export default useQueryReviews;
