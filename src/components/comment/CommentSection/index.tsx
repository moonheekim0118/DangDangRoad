import React, { useState, useEffect, useRef, useCallback } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { REMOVE_MESSAGE } from 'common/constant/string';
import { CommentResult, CommentData } from 'types/API';
import { InputRef, inputDefaultRef } from 'types/Ref';
import { WriteComment, CommentList } from 'components/comment';
import { createComment, getComments, removeComment } from 'api/comment';
import { useNotificationDispatch } from 'context/Notification';
import cacheProto from 'util/cache';
import * as Action from 'action';
import * as S from './style';

const COMMENT_DATA_LIMIT = 5;

interface Props {
  userId?: string;
  postId: string;
}

const CACHE = new cacheProto<{
  lastKey: string;
  hasMore: boolean;
  comments: CommentData[];
}>();

const CommentSection = ({ userId, postId = '' }: Props) => {
  const dispatch = useNotificationDispatch();
  const commentRef = useRef<InputRef>(inputDefaultRef());
  const [comments, setComments] = useState<CommentData[]>([]);
  const [lastKey, setLastKey] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [
    createCommentResult,
    createCommenFetch,
    setDefaultCreateComment,
  ] = useApiFetch<CommentData>(createComment);
  const [
    getCommentResult,
    getCommentFetch,
    setDefaultGetComment,
  ] = useApiFetch<CommentResult>(getComments);

  const [
    removeCommentResult,
    removeCommentFetch,
    setDefaultRemoveComment,
  ] = useApiFetch<string>(removeComment);

  /** initially get Comments Datas from Cache or API fetching */
  useEffect(() => {
    if (CACHE.has(postId)) {
      const cachedData = CACHE.get(postId);
      setLastKey(cachedData.lastKey);
      setComments(cachedData.comments);
      setHasMore(cachedData.hasMore);
    } else {
      getCommentFetch({ type: REQUEST, params: [postId] });
    }
  }, [postId]);

  /** hanlding result of getComments data fetching */
  useEffect(() => {
    switch (getCommentResult.type) {
      case SUCCESS:
        if (getCommentResult.data) {
          const { lastKey, comments: newComments } = getCommentResult.data;
          const updatedComments = comments.concat(newComments);
          const hasMore = newComments.length === COMMENT_DATA_LIMIT;
          setLastKey(lastKey);
          setComments(updatedComments);
          setHasMore(hasMore);
          CACHE.set(postId, {
            lastKey,
            comments: updatedComments,
            hasMore,
          });
        }
        setDefaultGetComment();
        break;
      case FAILURE:
        dispatch(Action.showError(getCommentResult.error));
        setDefaultGetComment();
    }
  }, [getCommentResult, comments]);

  /** hanlding result of createComment data fetching */
  useEffect(() => {
    switch (createCommentResult.type) {
      case SUCCESS:
        const newComment = createCommentResult.data;
        if (newComment) {
          // add New Comment
          const updatedComments = comments.concat(newComment);
          setComments(updatedComments);
          const cachedData = CACHE.get(postId);
          const updatedData = {
            ...cachedData,
            comments: updatedComments,
          };
          CACHE.set(postId, updatedData); // update Cached Data
        }
        setDefaultCreateComment();
        break;
      case FAILURE:
        dispatch(Action.showError(getCommentResult.error));
        setDefaultCreateComment();
    }
  }, [createCommentResult, comments]);

  /** hanlding result of remove Comment data fetching */
  useEffect(() => {
    switch (removeCommentResult.type) {
      case SUCCESS:
        const id = removeCommentResult.data; // removed data's Id
        let updatedLastKey = lastKey;
        // remove item & update LastKey if it need to be
        const updatedComments = comments.filter((v, i) => {
          if (v.docId === id && v.createdAt === lastKey) {
            updatedLastKey = comments[i - 1].createdAt;
          }
          return v.docId !== id;
        });
        setComments(updatedComments);
        setDefaultRemoveComment();
        const cachedData = CACHE.get(postId);
        const updatedData = {
          ...cachedData,
          comments: updatedComments,
          lastKey: updatedLastKey,
        };
        CACHE.set(postId, updatedData); // update Cached Data
        dispatch(Action.showSuccess(REMOVE_MESSAGE));
        break;
      case FAILURE:
        dispatch(Action.showError(removeCommentResult.error));
        setDefaultRemoveComment();
    }
  }, [removeCommentResult, comments, lastKey]);

  const submitCommentHanlder = useCallback(() => {
    const { value: contents } = commentRef.current;
    createCommenFetch({
      type: REQUEST,
      params: [
        {
          userId,
          postId,
          contents,
        },
      ],
    });
  }, []);

  const getMoreCommentsHandler = useCallback(() => {
    hasMore && getCommentFetch({ type: REQUEST, params: [postId, lastKey] });
  }, [lastKey, hasMore, postId]);

  const removeCommentHandler = useCallback(
    (id: string) => () => {
      removeCommentFetch({ type: REQUEST, params: [id] });
    },
    []
  );

  return (
    <S.Container>
      <CommentList
        getMoreCommentsHandler={getMoreCommentsHandler}
        removeCommentHandler={removeCommentHandler}
        comments={comments}
        userId={userId}
        hasMore={hasMore}
        isLoading={
          getCommentResult.type === REQUEST || getCommentResult.type === SUCCESS
        }
      />
      {userId && (
        <WriteComment submitComment={submitCommentHanlder} ref={commentRef} />
      )}
    </S.Container>
  );
};

export default CommentSection;
