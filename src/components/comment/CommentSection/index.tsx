import React, { useState, useEffect, useRef, useCallback } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { CommentResult, CommentData } from 'types/API';
import { InputRef, inputDefaultRef } from 'types/Ref';
import { WriteComment } from 'components/comment';
import { createComment, getComments } from 'api/comment';
import { useNotificationDispatch } from 'context/Notification';
import { Author, Icon, Button } from 'components/ui';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as Action from 'action';
import * as S from './style';

const COMMENT_DATA_LIMIT = 5;
interface Props {
  userId: string;
  postId: string;
}

const CommentSection = ({ userId, postId }: Props) => {
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

  useEffect(() => {
    getCommentFetch({ type: REQUEST, params: [postId] });
  }, []);

  useEffect(() => {
    switch (getCommentResult.type) {
      case SUCCESS:
        if (getCommentResult.data) {
          const { lastKey, comments: newComments } = getCommentResult.data;
          setLastKey(lastKey);
          setComments(comments.concat(newComments));
          setHasMore(newComments.length === COMMENT_DATA_LIMIT);
        }
        setDefaultGetComment();
        break;
      case FAILURE:
        dispatch(Action.showError(getCommentResult.error));
        setDefaultGetComment();
    }
  }, [getCommentResult, comments]);

  useEffect(() => {
    switch (createCommentResult.type) {
      case SUCCESS:
        const newComment = createCommentResult.data;
        newComment && setComments(comments.concat(newComment));
        setDefaultCreateComment();
        break;
      case FAILURE:
        dispatch(Action.showError(getCommentResult.error));
        setDefaultCreateComment();
    }
  }, [createCommentResult, comments]);

  const submitComment = useCallback(() => {
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

  const getMoreComments = useCallback(() => {
    hasMore && getCommentFetch({ type: REQUEST, params: [postId, lastKey] });
  }, [lastKey, hasMore]);

  const removeComment = useCallback((id: string) => {}, []);

  return (
    <S.Container>
      <S.CommentContainer>
        <S.CommentList>
          {comments.map((v) => (
            <S.CommentCard key={v.docId}>
              <Author userData={v.userData} size="small" />
              <S.CommentContents>{v.contents}</S.CommentContents>
            </S.CommentCard>
          ))}
          <Button size="large" width="100%" onClick={getMoreComments}>
            <Icon icon={faPlusCircle} size="large" style={S.moreIconStyle} />
          </Button>
        </S.CommentList>
      </S.CommentContainer>
      <WriteComment submitComment={submitComment} ref={commentRef} />
    </S.Container>
  );
};

export default CommentSection;
