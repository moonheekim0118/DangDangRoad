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
  const { result, dispatch } = useInfiniteData<LightReview>();
  const { type, dataList: reviews, hasMore } = result;

  const [getReviewsResult, getReviewsFetch] = useApiFetch<LightReview[]>(
    searchByKeyword
  );

  const [
    getReviewsMoreResult,
    getReviewsMoreFetch,
    getReviewsMoreSetDefault,
  ] = useApiFetch<LightReview[]>(searchByKeyword);

  useEffect(() => {
    dispatch({ type: INIT, data: { dataList: [], hasMore: true } });
  }, [query]);

  useEffect(() => {
    if (!query) return;
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
      getReviewsFetch({ type: REQUEST, params: [query] });
    }
  }, [pathName, query]);

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
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsResult.error));
        break;
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

  const handleFetchReview = useCallback(() => {
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

  const handleRemoveCache = useCallback((id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  }, []);

  return [
    reviews,
    hasMore,
    handleFetchReview,
    handleRemoveCache,
    getReviewsResult.type,
    getReviewsMoreResult.type,
    query,
  ] as const;
};

export default useQueryReviews;
