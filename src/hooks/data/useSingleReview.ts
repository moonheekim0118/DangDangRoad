import { useEffect, useState } from 'react';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { getReviewById } from 'api/review';
import { FullReview } from 'types/Review';
import cacheProto from 'util/cache';

/**
 *  hooks for single Review Fetch and store data
 *  props : initialFetch true if page needs to initially fetch data by query
 */

const CACHE = new cacheProto<FullReview>();

const useSingleReview = () => {
  const [result, dispatch, setDefault] = useApiFetch<FullReview>(getReviewById);

  const [singleReview, setSingleReview] = useState<FullReview | null>(null);

  useEffect(() => {
    const { data, type } = result;
    if (type !== SUCCESS || !data) return;
    setSingleReview(data);
    CACHE.set(data.docId, data, 1); // store in cache
    setDefault();
  }, [result]);

  const fetchData = (postId: string) => {
    if (CACHE.has(postId)) {
      return setSingleReview(CACHE.get(postId));
    }
    dispatch({ type: REQUEST, params: [postId] });
  };

  const handleRemoveCache = (postId: string) => {
    CACHE.delete(postId);
  };

  const handleUpdateCache = (postId: string, data: FullReview) => {
    CACHE.set(postId, data, 1);
  };

  return {
    singleReview,
    singleReviewFetchStatus: result.type,
    singleReviewFetchError: result.error,
    fetchData,
    handleRemoveCache,
    handleUpdateCache,
  };
};

export default useSingleReview;
