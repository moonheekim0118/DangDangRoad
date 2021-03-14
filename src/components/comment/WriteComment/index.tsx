import React from 'react';
import { Button } from 'atoms';
import * as S from './style';

const WriteComment = () => {
  return (
    <S.Form>
      <S.TextArea cols={1} placeholder="댓글을 작성해주세요..." />
      <S.ButtonContainer>
        <Button
          className="commentSubmitBtn"
          type="submit"
          css={S.submitBtnStyle}>
          게시
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default WriteComment;
