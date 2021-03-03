import { useEffect, useState, useCallback } from 'react';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/useApiFetch';
import Router from 'next/router';
import { getReviewById } from 'api/review';
import * as T from 'types/API';

/**
 *  hooks for single Review Fetch and store data
 *  props : initialFetch true if page needs to initially fetch data by query
 */

const useSingleReview = (initialFetch: boolean) => {
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<T.reviewData>(
    getReviewById
  );
  const [singleReview, setSingleReview] = useState<T.reviewData>();

  useEffect(() => {
    if (fetchResult.type === SUCCESS && fetchResult.data) {
      setSingleReview(fetchResult.data);
      setDefault();
    }
  }, [fetchResult]);

  const fetchData = useCallback((postId: string) => {
    fetchDispatch({ type: REQUEST, params: [postId] });
  }, []);

  useEffect(() => {
    const postId = Router.query.id;
    if (initialFetch && typeof postId === 'string') {
      fetchData(postId);
    }
  }, []);

  return [singleReview, fetchResult, fetchData] as const;
};

export default useSingleReview;
