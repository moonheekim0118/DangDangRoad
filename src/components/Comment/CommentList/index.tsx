import React, { useEffect } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import Comment from 'types/Comment';
import { removeComment } from 'api/comment';
import { Loading, Author, Button, Icon } from 'components/UI';
import { DELETE_BUTTON_CAPTION, REMOVE_MESSAGE } from 'common/constant/string';
import { useNotificationDispatch } from 'context/Notification';
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import * as Action from 'action';
import * as S from './style';

const DetailsDropdown = dynamic(() => import('components/UI/DetailsDropdown'));

interface Props {
  /** fetch more comments handler */
  onClickFetch: () => void;
  /** remove comment from list handler */
  handleRemoveCache: (id: string) => void;
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
  onClickFetch,
  handleRemoveCache,
  comments,
  userId,
  hasMore,
  isLoading,
}: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const [result, dispatch, setDefault] = useApiFetch<string>(removeComment);

  useEffect(() => {
    switch (result.type) {
      case SUCCESS:
        setDefault();
        const id = result.data;
        if (!id) return;
        handleRemoveCache(id);
        notiDispatch(Action.showSuccess(REMOVE_MESSAGE));
        return;
      case FAILURE:
        notiDispatch(Action.showError(result.error));
        setDefault();
        return;
    }
  }, [result, comments]);

  const handleRemoveComment = (id: string) => () => {
    dispatch({ type: REQUEST, params: [id] });
  };

  return (
    <S.Container>
      <S.List>
        {comments.map((comment) => (
          <S.CommentCard key={comment.docId}>
            <Author userData={comment.userData} size="small">
              {comment.userId === userId ? (
                <DetailsDropdown
                  theme="primary"
                  menuList={[
                    {
                      title: DELETE_BUTTON_CAPTION,
                      onClick: handleRemoveComment(comment.docId),
                    },
                  ]}>
                  <summary>
                    <Icon icon={faEllipsisV} size="small" />
                  </summary>
                </DetailsDropdown>
              ) : undefined}
            </Author>
            <S.CommentContents>{comment.contents}</S.CommentContents>
          </S.CommentCard>
        ))}
        {isLoading ? (
          <S.LoadingContainer>
            <Loading size="medium" />
          </S.LoadingContainer>
        ) : (
          <>
            {hasMore && (
              <Button size="large" width="100%" onClick={onClickFetch}>
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
