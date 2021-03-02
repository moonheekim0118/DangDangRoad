import { useEffect, useState, useCallback } from 'react';
import { useFetchState } from 'hooks';
import Router from 'next/router';
import * as T from 'types/API';
import api from 'api';

/**
 *  hooks for single Review Fetch and store data
 *  props : initialFetch true if page needs to initially fetch data by query
 */

const useSingleReviewFetch = (initialFetch: boolean) => {
  const [fetchState, setLoading, setDone, setError] = useFetchState();
  const [singleReview, setSingleReview] = useState<T.reviewData>();

  const fetchData = useCallback(async (postId: string) => {
    try {
      setLoading();
      const response = await api.getReviewById(postId);
      if (!response.isError) {
        setSingleReview(response.data);
        setDone();
      }
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    const postId = Router.query.id;
    if (initialFetch && typeof postId === 'string') {
      fetchData(postId).then(() => {});
    }
  }, []);

  return [singleReview, fetchState, fetchData] as const;
};

export default useSingleReviewFetch;
