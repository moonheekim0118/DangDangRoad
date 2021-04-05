import { useEffect, useCallback } from 'react';
import useInfiniteData, {
  INIT,
  ADD,
  UPDATE,
  REMOVE,
} from 'hooks/data/useInfiniteData';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { CommentResult } from 'types/API';
import { getComments } from 'api/comment';
import { COMMENT_DATA_LIMIT } from 'common/constant/number';
import Comment from 'types/Comment';
import cacheProto from 'util/cache';
import { useNotificationDispatch } from 'context/Notification';
import * as Action from 'action';

interface DataType {
  lastKey: number;
  hasMore: boolean;
  comments: Comment[];
}
const CACHE = new cacheProto<DataType>();

const useComments = (postId: string) => {
  const notiDispatch = useNotificationDispatch();
  const [
    getCommentResult,
    getCommentFetch,
    getCommentSetDefault,
  ] = useApiFetch<CommentResult>(getComments);
  const { result, dispatch, setDefault } = useInfiniteData<Comment>();
  const { type, dataList: comments, hasMore, lastKey } = result;

  useEffect(() => {
    if (CACHE.has(postId)) {
      const cachedData = CACHE.get(postId);
      if (cachedData) {
        dispatch({
          type: INIT,
          data: {
            dataList: cachedData.comments,
            lastKey: cachedData.lastKey,
            hasMore: cachedData.hasMore,
          },
        });
      }
    } else {
      getCommentFetch({ type: REQUEST, params: [postId] });
    }
  }, [postId]);

  useEffect(() => {
    if (type === REMOVE || type === ADD || type === UPDATE) {
      CACHE.set(
        postId,
        {
          comments,
          lastKey,
          hasMore,
        },
        comments.length
      );
      setDefault();
    }
  }, [result, postId]);

  /** hanlding result of getComments data fetching */
  useEffect(() => {
    switch (getCommentResult.type) {
      case SUCCESS:
        if (getCommentResult.data) {
          const {
            lastKey: newLastKey,
            comments: newComments,
          } = getCommentResult.data;
          const newHasMore = newComments.length === COMMENT_DATA_LIMIT;
          dispatch({
            type: UPDATE,
            data: {
              dataList: newComments,
              lastKey: newLastKey,
              hasMore: newHasMore,
            },
          });
          getCommentSetDefault();
          break;
        }
      case FAILURE:
        notiDispatch(Action.showError(getCommentResult.error));
        getCommentSetDefault();
    }
  }, [getCommentResult]);

  const getMoreCommentsHandler = useCallback(() => {
    hasMore && getCommentFetch({ type: REQUEST, params: [postId, lastKey] });
  }, [lastKey, hasMore, postId]);

  const addCommentHandler = useCallback((newComment: Comment) => {
    dispatch({ type: ADD, data: { dataList: [newComment] } });
  }, []);

  const removeCacheHandler = useCallback((id: string) => {
    dispatch({ type: REMOVE, data: { id } });
  }, []);

  return [
    comments,
    hasMore,
    getCommentResult.type,
    getMoreCommentsHandler,
    addCommentHandler,
    removeCacheHandler,
  ] as const;
};

export default useComments;
