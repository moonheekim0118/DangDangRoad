import { useEffect, useState, useCallback } from 'react';
import { useApiFetch } from 'hooks';
import { getReviewsMore, removeReview } from 'api/review';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import * as T from 'types/API';

interface Props {
  /** initial Review data from static props */
  initReviews?: T.LightReviewData[];
  /** initial last key data from static props */
  initLastKey?: string;
}

const useAllReviews = ({ initReviews, initLastKey }: Props = {}) => {
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<T.ReviewResult>(
    getReviewsMore
  );
  const [
    fetchRemoveResult,
    fetchRemoveDispatch,
    setRemoveDefault,
  ] = useApiFetch(removeReview);

  const [lastKey, setLastKey] = useState<string>(initLastKey || '');
  const [allReviews, setAllReviews] = useState<T.LightReviewData[]>(
    initReviews || []
  );
  const [hasMore, setHasMore] = useState<boolean>(true); // let us know if there is more data to fetch in db
  const [selectId, setSelectId] = useState<string>('');

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        if (fetchResult.data) {
          setLastKey(fetchResult.data.lastKey);
          const newReviews = fetchResult.data.reviews;
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
    if (hasMore) {
      fetchDispatch({ type: REQUEST, params: [lastKey] });
    }
  }, [allReviews, hasMore, lastKey]);

  // remove
  const fetchRemove = useCallback((id: string) => {
    fetchRemoveDispatch({ type: REQUEST, params: [id] });
    setSelectId(id);
  }, []);

  return [allReviews, fetchReview, fetchRemove, fetchResult, hasMore] as const;
};

export default useAllReviews;
