import React, { useState, useEffect, useCallback } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { EMPTY_COMMENT_TITLE } from 'common/constant/string';
import { Loading } from 'components/UI';
import { COMMENT_DATA_LIMIT } from 'common/constant/number';
import { CommentResult, CommentData } from 'types/API';
import { getComments } from 'api/comment';
import { useNotificationDispatch } from 'context/Notification';
import cacheProto from 'util/cache';
import dynamic from 'next/dynamic';
import * as Action from 'action';
import * as S from './style';

const WriteComment = dynamic(() => import('components/Comment/WriteComment'));
const CommentList = dynamic(() => import('components/Comment/CommentList'));

interface Props {
  /** logged-in user Id */
  userId?: string;
  /** post Id of comments */
  postId: string;
}

interface DataType {
  lastKey: string;
  hasMore: boolean;
  comments: CommentData[];
}

const CACHE = new cacheProto<DataType>();

const CommentSection = ({ userId, postId = '' }: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [lastKey, setLastKey] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [
    getCommentResult,
    getCommentFetch,
    getCommentSetDefault,
  ] = useApiFetch<CommentResult>(getComments);

  /** initially get Comments Datas from Cache or API fetching */
  useEffect(() => {
    if (CACHE.has(postId)) {
      const cachedData = CACHE.get(postId);
      if (cachedData) {
        setLastKey(cachedData.lastKey);
        setComments(cachedData.comments);
        setHasMore(cachedData.hasMore);
      }
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
          getCommentSetDefault();
          break;
        }
      case FAILURE:
        notiDispatch(Action.showError(getCommentResult.error));
        getCommentSetDefault();
    }
  }, [getCommentResult, comments]);

  const addCommentHandler = useCallback(
    (newComment: CommentData) => {
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      const cachedData = CACHE.get(postId);
      const updatedData = {
        ...cachedData,
        comments: updatedComments,
      } as DataType;
      CACHE.set(postId, updatedData);
    },
    [comments]
  );

  const getMoreCommentsHandler = useCallback(() => {
    hasMore && getCommentFetch({ type: REQUEST, params: [postId, lastKey] });
  }, [lastKey, hasMore, postId]);

  const removeCommentHandler = useCallback(
    (id: string) => {
      const cachedData = CACHE.get(postId);
      let updatedLastKey = cachedData?.lastKey || 0;
      // remove item & update LastKey if it need to be
      const updatedComments = comments.filter((v, i) => {
        if (v.docId === id && v.createdAt === updatedLastKey) {
          updatedLastKey = comments[i - 1].createdAt;
        }
        return v.docId !== id;
      });
      const updatedData = {
        ...cachedData,
        comments: updatedComments,
        lastKey: updatedLastKey,
      } as DataType;
      setComments(updatedComments);
      CACHE.set(postId, updatedData);
    },
    [comments]
  );

  return (
    <S.Container>
      {comments.length > 0 ? (
        <CommentList
          getMoreCommentsHandler={getMoreCommentsHandler}
          removeCommentHandler={removeCommentHandler}
          comments={comments}
          userId={userId}
          hasMore={hasMore}
          isLoading={
            getCommentResult.type === REQUEST ||
            getCommentResult.type === SUCCESS
          }
        />
      ) : (
        <S.LoadingContainer>
          {getCommentResult.type === REQUEST ||
          getCommentResult.type === SUCCESS ? (
            <Loading />
          ) : (
            <span>{EMPTY_COMMENT_TITLE}</span>
          )}
        </S.LoadingContainer>
      )}
      {userId && (
        <WriteComment
          addCommentHandler={addCommentHandler}
          userId={userId}
          postId={postId}
        />
      )}
    </S.Container>
  );
};

export default CommentSection;
