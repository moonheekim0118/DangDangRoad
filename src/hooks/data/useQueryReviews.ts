import { useEffect, useState, useCallback } from 'react';
import { useApiFetch } from 'hooks';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { useRouter } from 'next/router';
import { useNotificationDispatch } from 'context/Notification';
import searchByKeyword from 'api/search';
import cacheProto from 'util/cache';
import * as Action from 'action';
import * as T from 'types/API';

interface DataType {
  reviews: T.LightReviewData[];
  hasMore: boolean;
}

const CACHE = new cacheProto<DataType>();

const useQueryReviews = () => {
  const notiDispatch = useNotificationDispatch();
  const router = useRouter();
  const query = router.query.search_query as string;
  const [allReviews, setAllReviews] = useState<T.LightReviewData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [getReviewsResult, getReviewsFetch, getReviewsSetDefault] = useApiFetch<
    T.LightReviewData[]
  >(searchByKeyword);

  useEffect(() => {
    const cachedData = CACHE.get(query);
    if (CACHE.has(query) && cachedData) {
      setAllReviews(cachedData.reviews);
      setHasMore(cachedData.hasMore);
    } else {
      getReviewsFetch({ type: REQUEST, params: [query] });
    }
  }, []);

  useEffect(() => {
    switch (getReviewsResult.type) {
      case SUCCESS:
        if (getReviewsResult.data) {
          const newReviews = getReviewsResult.data;
          const updatedReviews = allReviews.concat(newReviews);
          const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
          setAllReviews(updatedReviews);
          setHasMore(newReviews.length === REVIEW_DATA_LIMIT);
          CACHE.set(query, {
            reviews: updatedReviews,
            hasMore,
          });
        }
        getReviewsSetDefault();
        break;
      case FAILURE:
        notiDispatch(Action.showError(getReviewsResult.error));
        getReviewsSetDefault();
    }
  }, [getReviewsResult, allReviews]);

  const fetchReviewHandler = useCallback(() => {
    if (hasMore && query) {
      getReviewsFetch({ type: REQUEST, params: [query] });
    }
  }, [allReviews, hasMore, query]);

  const removeCacheHandler = useCallback(
    (id: string) => {
      const newReviews = allReviews.filter((v) => v.docId !== id);
      setAllReviews(newReviews);
      const cachedData = CACHE.get(query);
      CACHE.set(query, {
        ...cachedData,
        reviews: newReviews,
      } as DataType);
    },
    [allReviews]
  );

  return [
    allReviews,
    fetchReviewHandler,
    removeCacheHandler,
    getReviewsResult.type,
    hasMore,
    query,
  ] as const;
};

export default useQueryReviews;
