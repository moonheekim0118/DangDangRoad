import { useEffect, useState, useCallback } from 'react';
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
  const [
    getReviewResult,
    getReviewFetch,
    getReviewSetDefault,
  ] = useApiFetch<FullReview>(getReviewById);

  const [singleReview, setSingleReview] = useState<FullReview | null>(null);

  useEffect(() => {
    if (getReviewResult.type === SUCCESS && getReviewResult.data) {
      setSingleReview(getReviewResult.data);
      CACHE.set(getReviewResult.data.docId, getReviewResult.data); // store in cache
      getReviewSetDefault();
    }
  }, [getReviewResult]);

  const fetchData = useCallback((postId: string) => {
    if (CACHE.has(postId)) {
      // check if it's cached data or not
      return setSingleReview(CACHE.get(postId));
    }
    getReviewFetch({ type: REQUEST, params: [postId] });
  }, []);

  const removeCache = useCallback((postId: string) => {
    CACHE.delete(postId);
  }, []);

  const updateCache = useCallback((postId: string, data: FullReview) => {
    CACHE.set(postId, data);
  }, []);

  return {
    singleReview,
    singleReviewFetchStatus: getReviewResult.type,
    singleReviewFetchError: getReviewResult.error,
    fetchData,
    removeCache,
    updateCache,
  };
};

export default useSingleReview;
