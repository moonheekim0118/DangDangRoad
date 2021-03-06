import { useEffect, useState, useCallback } from 'react';
import { useApiFetch } from 'hooks';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { removeReview } from 'api/review';
import searchByKeyword from 'api/search';
import Router from 'next/router';
import * as T from 'types/API';

const useQueryReviews = () => {
  const [query, setQuery] = useState<string>('');
  const [allReviews, setAllReviews] = useState<T.lightReviewData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<
    T.lightReviewData[]
  >(searchByKeyword);
  const [selectId, setSelectId] = useState<string>('');

  const [
    fetchRemoveResult,
    fetchRemoveDispatch,
    setRemoveDefault,
  ] = useApiFetch(removeReview);

  useEffect(() => {
    const search_query = Router.query.search_query;
    if (typeof search_query === 'string') {
      console.log(search_query);
      setQuery(search_query);
      fetchDispatch({ type: REQUEST, params: [search_query] });
    }
  }, []);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        if (fetchResult.data) {
          const newReviews = fetchResult.data;
          setAllReviews(allReviews.concat(newReviews));
          setHasMore(newReviews.length === REVIEW_DATA_LIMIT);
        }
        setDefault();
        break;
      case FAILURE:
    }
  }, [fetchResult, allReviews]);

  useEffect(() => {
    switch (fetchRemoveResult.type) {
      case SUCCESS:
        const newReviews = allReviews.filter((v) => v.docId !== selectId);
        setAllReviews(newReviews);
        setRemoveDefault();
        break;
      case FAILURE:
    }
  }, [fetchRemoveResult, allReviews, selectId]);

  const fetchReview = useCallback(() => {
    if (hasMore && query) {
      fetchDispatch({ type: REQUEST, params: [query] });
    }
  }, [allReviews, hasMore, query]);

  const fetchRemove = useCallback((id: string) => {
    fetchRemoveDispatch({ type: REQUEST, params: [id] });
    setSelectId(id);
  }, []);

  return [allReviews, fetchReview, fetchRemove, fetchResult, hasMore] as const;
};

export default useQueryReviews;
