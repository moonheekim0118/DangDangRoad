import React, { FormEvent, useCallback, useEffect } from 'react';
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
  addCommentHandler: (newComments: Comment) => void;
}

const WriteComment = ({
  userId,
  postId,
  addCommentHandler,
}: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();
  const { value, error, valueChangeHanlder, setValue } = useValidation({
    validator: checkCommentLength,
  });

  const [createCommentResult, createCommentFetch] = useApiFetch<Comment>(
    createComment
  );

  useEffect(() => {
    switch (createCommentResult.type) {
      case SUCCESS:
        const newComment = createCommentResult.data;
        if (newComment) {
          addCommentHandler(newComment);
          break;
        }
      case FAILURE:
        notiDispatch(Action.showError(createCommentResult.error));
        break;
    }
  }, [createCommentResult]);

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createCommentFetch({
        type: REQUEST,
        params: [{ userId, postId, contents: value }],
      });
      setValue('');
    },
    [value]
  );

  return (
    <S.Form onSubmit={submitHandler}>
      <S.TextArea
        cols={1}
        placeholder={COMMENT_PLACEHOLDER}
        value={value}
        onChange={valueChangeHanlder}
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
