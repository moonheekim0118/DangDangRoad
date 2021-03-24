import { useEffect, useState, useCallback } from 'react';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { useRouter } from 'next/router';
import { getReviewById } from 'api/review';
import cacheProto from 'util/cache';
import * as T from 'types/API';

/**
 *  hooks for single Review Fetch and store data
 *  props : initialFetch true if page needs to initially fetch data by query
 */

const CACHE = new cacheProto<T.ReviewData>();

const useSingleReview = (initialFetch: boolean) => {
  const router = useRouter();
  const postId = router.query.id;

  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<T.ReviewData>(
    getReviewById
  );
  const [singleReview, setSingleReview] = useState<T.ReviewData | null>(null);

  useEffect(() => {
    if (fetchResult.type === SUCCESS && fetchResult.data) {
      setSingleReview(fetchResult.data);
      CACHE.set(fetchResult.data.docId, fetchResult.data); // store in cache
      setDefault();
    }
  }, [fetchResult]);

  useEffect(() => {
    if (initialFetch && typeof postId === 'string') {
      fetchData(postId);
    }
  }, []);

  const fetchData = useCallback((postId: string) => {
    if (CACHE.has(postId)) {
      // check if it's cached data or not
      console.log(CACHE);
      return setSingleReview(CACHE.get(postId));
    }
    fetchDispatch({ type: REQUEST, params: [postId] });
  }, []);

  const removeCache = useCallback((postId: string) => {
    CACHE.delete(postId);
  }, []);

  const updateCache = useCallback((postId: string, data: T.ReviewData) => {
    CACHE.set(postId, data);
  }, []);

  return { singleReview, fetchResult, fetchData, removeCache, updateCache };
};

export default useSingleReview;
