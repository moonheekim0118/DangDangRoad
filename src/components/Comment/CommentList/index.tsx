import React, { useEffect, useCallback } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import Comment from 'types/Comment';
import { Loading, Author, Button, Icon } from 'components/UI';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DELETE_BUTTON_CAPTION } from 'common/constant/string';
import { removeComment } from 'api/comment';
import { REMOVE_MESSAGE } from 'common/constant/string';
import { useNotificationDispatch } from 'context/Notification';
import * as Action from 'action';
import * as S from './style';

interface Props {
  /** fetch more comments handler */
  getMoreCommentsHandler: () => void;
  /** remove comment from list handler */
  removeCommentHandler: (id: string) => void;
  /** comments list to render */
  comments: Comment[];
  /** to check if comment writer and logged-in user is same user  */
  userId?: string;
  /** to check if we can load more comments */
  hasMore: boolean;
  /** fetch status */
  isLoading: boolean;
}

const CommentList = ({
  getMoreCommentsHandler,
  removeCommentHandler,
  comments,
  userId,
  hasMore,
  isLoading,
}: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [
    removeCommentResult,
    removeCommentFetch,
    removeCommentSetDefault,
  ] = useApiFetch<string>(removeComment);

  /** hanlding result of remove Comment data fetching */
  useEffect(() => {
    switch (removeCommentResult.type) {
      case SUCCESS:
        const id = removeCommentResult.data; // removed data's Id
        if (id) {
          removeCommentHandler(id);
          removeCommentSetDefault();
          notiDispatch(Action.showSuccess(REMOVE_MESSAGE));
          break;
        }
      case FAILURE:
        notiDispatch(Action.showError(removeCommentResult.error));
        removeCommentSetDefault();
    }
  }, [removeCommentResult, comments]);

  const removeCommentSubmitHandler = useCallback(
    (id: string) => () => {
      removeCommentFetch({ type: REQUEST, params: [id] });
    },
    []
  );

  return (
    <S.Container>
      <S.List>
        {comments.map((v) => (
          <S.CommentCard key={v.docId}>
            <Author
              userData={v.userData}
              size="small"
              menuList={
                v.userId === userId
                  ? [
                      {
                        title: DELETE_BUTTON_CAPTION,
                        onClick: removeCommentSubmitHandler(v.docId),
                      },
                    ]
                  : undefined
              }
            />
            <S.CommentContents>{v.contents}</S.CommentContents>
          </S.CommentCard>
        ))}
        {isLoading ? (
          <S.LoadingContainer>
            <Loading size="medium" />
          </S.LoadingContainer>
        ) : (
          <>
            {hasMore && (
              <Button
                size="large"
                width="100%"
                onClick={getMoreCommentsHandler}>
                <Icon
                  icon={faPlusCircle}
                  size="large"
                  style={S.moreIconStyle}
                />
              </Button>
            )}
          </>
        )}
      </S.List>
    </S.Container>
  );
};

export default CommentList;
