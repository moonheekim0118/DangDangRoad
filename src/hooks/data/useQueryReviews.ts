import { useEffect } from 'react';
import useInfiniteData, {
  INIT,
  UPDATE,
  REMOVE,
} from 'hooks/data/useInfiniteData';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
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

  const [getResult, getDispatch, getSetDefault] = useApiFetch<LightReview[]>(
    searchByKeyword,
    {
      onSuccess: (response) => {
        getSetDefault();
        if (!response.data) return;
        const newReviews = response.data;
        const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
        dispatch({ type: UPDATE, data: { dataList: newReviews, hasMore } });
      },
      onFailure: (response) => {
        notiDispatch(Action.showError(response.error));
        getSetDefault();
      },
    }
  );

  const [getMoreResult, getMoreDispatch, getMoreSetDefault] = useApiFetch<
    LightReview[]
  >(searchByKeyword, {
    onSuccess: (response) => {
      getMoreSetDefault();
      if (!response.data) return;
      const newReviews = response.data;
      const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
      dispatch({ type: UPDATE, data: { dataList: newReviews, hasMore } });
    },
    onFailure: (response) => {
      notiDispatch(Action.showError(response.error));
      getMoreSetDefault();
    },
  });

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
      getDispatch({ type: REQUEST, params: [query] });
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

  const handleFetchReview = () => {
    const fetchStatus = getResult.type;
    if (
      hasMore &&
      query &&
      fetchStatus !== REQUEST &&
      fetchStatus !== SUCCESS
    ) {
      getMoreDispatch({ type: REQUEST, params: [query] });
    }
  };

  const handleRemoveCache = (id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  };

  return [
    reviews,
    hasMore,
    handleFetchReview,
    handleRemoveCache,
    getResult.type,
    getMoreResult.type,
    query,
  ] as const;
};

export default useQueryReviews;
