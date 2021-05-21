import React, { useCallback, useEffect } from 'react';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { COMMENT_PLACEHOLDER } from 'common/constant/string';
import { checkCommentLength } from 'util/reviewTextValidations';
import { useValidation, useApiFetch } from 'hooks';
import { Button } from 'components/UI';
import { createComment } from 'api/comment';
import { useNotificationDispatch } from 'context/Notification';
import Comment from 'types/Comment';
import * as Action from 'action';
import * as S from './style';

interface Props {
  /** author's id */
  userId: string;
  /** comment's postId */
  postId: string;
  /** to store new Comment in cache and state */
  handleAddComment: (newComments: Comment) => void;
}

const WriteComment = ({
  userId,
  postId,
  handleAddComment,
}: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const { value, error, handleChangeValue, setValue } = useValidation({
    validator: checkCommentLength,
  });

  const [result, dispatch] = useApiFetch<Comment>(createComment);

  useEffect(() => {
    switch (result.type) {
      case SUCCESS:
        const newComment = result.data;
        if (newComment) {
          handleAddComment(newComment);
        }
        return;
      case FAILURE:
        notiDispatch(Action.showError(result.error));
        return;
    }
  }, [result]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({
        type: REQUEST,
        params: [{ userId, postId, contents: value }],
      });
      setValue('');
    },
    [value]
  );

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.TextArea
        cols={1}
        placeholder={COMMENT_PLACEHOLDER}
        value={value}
        onChange={handleChangeValue}
      />
      <S.ButtonContainer>
        <Button
          type="submit"
          theme="primary"
          size="medium"
          width="100px"
          disabled={error}>
          게시
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default WriteComment;
