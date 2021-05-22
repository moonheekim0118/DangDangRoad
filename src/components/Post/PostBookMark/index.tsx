import React, { useEffect, useState, useCallback } from 'react';
import { useLoginInfoState } from 'context/LoginInfo';
import {
  checkBookMark,
  addBookMarkReview,
  removeBookMarkReview,
} from 'api/bookmark';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { BookMarkResult } from 'types/API';
import { faBookmark as checkedBookMark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as unCheckdBookMark } from '@fortawesome/free-regular-svg-icons';
import { Icon, Button } from 'components/UI';
import Router from 'next/router';
import routes from 'common/constant/routes';
import cacheProto from 'util/cache';
import * as S from './style';

interface Props {
  postId: string;
}

const CACHE = new cacheProto<boolean>();
let CACHED_USER = '';

const PostBookMark = ({ postId }: Props) => {
  const { userId } = useLoginInfoState();
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  /** first check if user bookMakred post or not */
  const [
    checkResult,
    checkDispatch,
    checkSetDefault,
  ] = useApiFetch<BookMarkResult>(checkBookMark);

  /** add BookMark to User */
  const [addResult, addDispatch, addSetDefault] = useApiFetch<string>(
    addBookMarkReview
  );

  /** remove BookMark from user */
  const [removeResult, removeDispatch, removeSetDefault] = useApiFetch<string>(
    removeBookMarkReview
  );

  useEffect(() => {
    if (userId) {
      if (CACHED_USER === userId) {
        if (CACHE.has(postId)) {
          return setIsBookMarked(CACHE.get(postId) || false);
        }
      } else {
        CACHED_USER = userId;
        CACHE.clear();
      }
      checkDispatch({ type: REQUEST, params: [userId, postId] });
    }
  }, [postId, userId]);

  useEffect(() => {
    const { type, data } = checkResult;
    if (type !== SUCCESS || !data) return;
    setIsBookMarked(data.isBookMarked);
    CACHE.set(data.postId, data.isBookMarked, 1);
    checkSetDefault();
    return;
  }, [checkResult]);

  /** handling add bookmark api fetch result */
  useEffect(() => {
    const { type, data: postId } = addResult;
    if (type !== SUCCESS || !postId) return;
    setIsBookMarked(true);
    CACHE.set(postId, true, 1);
    addSetDefault();
    return;
  }, [addResult]);

  /** handling remove bookmark api fetch result  */
  useEffect(() => {
    const { type, data: postId } = removeResult;
    if (type !== SUCCESS || !postId) return;
    setIsBookMarked(false);
    CACHE.delete(postId);
    removeSetDefault();
    return;
  }, [removeResult]);

  /** Toggle BookMark Button */
  const bookMarkToggleHanlder = useCallback(() => {
    if (!userId) Router.push(routes.LOGIN);
    if (isBookMarked) {
      return removeDispatch({ type: REQUEST, params: [userId, postId] });
    }
    return addDispatch({ type: REQUEST, params: [userId, postId] });
  }, [postId, userId, isBookMarked]);

  return (
    <S.Container>
      <Button
        size="medium"
        width="100%"
        onClick={bookMarkToggleHanlder}
        css={S.buttonStyle}>
        <>
          <Icon
            icon={isBookMarked ? checkedBookMark : unCheckdBookMark}
            size="medium"
            style={S.iconStyle}
          />
          <S.Title>북마크</S.Title>
        </>
      </Button>
    </S.Container>
  );
};

export default PostBookMark;
