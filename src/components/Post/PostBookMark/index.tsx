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
    checkBookMarkResult,
    checkBookMarkFetch,
    checkBookMarkSetDefault,
  ] = useApiFetch<BookMarkResult>(checkBookMark);

  /** add BookMark to User */
  const [
    addBookMarkResult,
    addBookMarkFetch,
    addBookMarkSetDefault,
  ] = useApiFetch<string>(addBookMarkReview);

  /** remove BookMark from user */
  const [
    removeBookMarkResult,
    removeBookMarkFetch,
    removeBookMarkSetDefault,
  ] = useApiFetch<string>(removeBookMarkReview);

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
      checkBookMarkFetch({ type: REQUEST, params: [userId, postId] });
    }
  }, [postId, userId]);

  /** handling check bookmark api fetch result */
  useEffect(() => {
    const result = checkBookMarkResult.data;
    if (checkBookMarkResult.type === SUCCESS && result) {
      setIsBookMarked(result.isBookMarked);
      CACHE.set(result.postId, result.isBookMarked, 1);
      return checkBookMarkSetDefault();
    }
  }, [checkBookMarkResult]);

  /** handling add bookmark api fetch result */
  useEffect(() => {
    const postId = addBookMarkResult.data;
    if (addBookMarkResult.type === SUCCESS && postId) {
      setIsBookMarked(true);
      CACHE.set(postId, true, 1);
      return addBookMarkSetDefault();
    }
  }, [addBookMarkResult]);

  /** handling remove bookmark api fetch result  */
  useEffect(() => {
    if (removeBookMarkResult.type === SUCCESS) {
      const postId = removeBookMarkResult.data;
      if (postId) {
        setIsBookMarked(false);
        CACHE.delete(postId);
      }
      return removeBookMarkSetDefault();
    }
  }, [removeBookMarkResult]);

  /** Toggle BookMark Button */
  const bookMarkToggleHanlder = useCallback(() => {
    if (!userId) Router.push(routes.LOGIN);
    if (isBookMarked) {
      return removeBookMarkFetch({ type: REQUEST, params: [userId, postId] });
    }
    return addBookMarkFetch({ type: REQUEST, params: [userId, postId] });
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
