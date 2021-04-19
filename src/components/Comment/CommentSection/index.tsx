import React from 'react';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { useComments } from 'hooks';
import { EMPTY_COMMENT_TITLE } from 'common/constant/string';
import { Loading } from 'components/UI';
import dynamic from 'next/dynamic';
import * as S from './style';

const WriteComment = dynamic(() => import('components/Comment/WriteComment'));
const CommentList = dynamic(() => import('components/Comment/CommentList'));

interface Props {
  /** logged-in user Id */
  userId?: string;
  /** post Id of comments */
  postId: string;
}

const CommentSection = ({ userId, postId = '' }: Props): React.ReactElement => {
  const [
    comments,
    hasMore,
    getCommentResultStatus,
    getMoreCommentsHandler,
    addCommentHandler,
    removeCacheHandler,
  ] = useComments(postId);
  return (
    <S.Container>
      {comments.length > 0 ? (
        <CommentList
          getMoreCommentsHandler={getMoreCommentsHandler}
          removeCacheHandler={removeCacheHandler}
          comments={comments}
          userId={userId}
          hasMore={hasMore}
          isLoading={
            getCommentResultStatus === REQUEST ||
            getCommentResultStatus === SUCCESS
          }
        />
      ) : (
        <S.LoadingContainer>
          {getCommentResultStatus === REQUEST ||
          getCommentResultStatus === SUCCESS ? (
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
