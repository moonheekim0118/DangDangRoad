import React, { useState, useEffect, useCallback } from 'react';
import { BookMarkListResult, BookMarkListType } from 'types/API';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { useApiFetch } from 'hooks';
import { getBookMarkedReviews, removeBookMarkReview } from 'api/bookmark';
import { BOOKMARK_DATA_LIMIT } from 'common/constant/number';
import { Button, Icon } from 'components/ui';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'components/MyPage';
import routes from 'common/constant/routes';
import Router from 'next/router';
import cacheProto from 'util/cache';
import * as S from './style';

interface Props {
  userId: string;
  pageNum: number;
}

const CACHE = new cacheProto<BookMarkListResult>();
let CACHED_USER = '';

const BookMarkList = ({ userId, pageNum }: Props) => {
  const [totalLength, setTotalLength] = useState<number>(0);
  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<BookMarkListType[]>([]);

  const [
    getBookMarksResult,
    getBookMarksFetch,
    getBookMarksSetDefault,
  ] = useApiFetch<BookMarkListType[]>(getBookMarkedReviews);

  const [
    removeBookMarkResult,
    removeBookMarkFetch,
    removeBookMarkSetDefault,
  ] = useApiFetch<string>(removeBookMarkReview);

  useEffect(() => {
    if (getBookMarksResult.type === SUCCESS) {
      const bookMarkList = getBookMarksResult.data || [];
      setTotalLength(bookMarkList.length);
      setReviewList(
        bookMarkList.slice(pageNum - 1, pageNum + BOOKMARK_DATA_LIMIT - 1)
      );
      CACHE.set(userId, { length, bookMarkList });
      getBookMarksSetDefault();
    }
  }, [getBookMarksResult]);

  useEffect(() => {
    if (removeBookMarkResult.type === SUCCESS) {
      const postId = removeBookMarkResult.data;
      const cachedData = CACHE.get(userId);
      if (postId && cachedData) {
        const updatedList = cachedData.bookMarkList.filter(
          (v) => v.docId !== postId
        );
        setReviewList(
          updatedList.slice(pageNum - 1, pageNum + BOOKMARK_DATA_LIMIT - 1)
        );
        setTotalLength(cachedData.length - 1);
        CACHE.set(userId, {
          length: totalLength - 1,
          bookMarkList: updatedList,
        });
      }
      removeBookMarkSetDefault();
    }
  }, [removeBookMarkResult]);

  useEffect(() => {
    if (userId) {
      if (CACHED_USER === userId && CACHE.has(userId)) {
        const cachedData = CACHE.get(userId);
        if (cachedData) {
          setReviewList(
            cachedData.bookMarkList.slice(
              pageNum - 1,
              pageNum + BOOKMARK_DATA_LIMIT - 1
            )
          );
          setTotalLength(cachedData.length);
        }
      }
      CACHED_USER = userId;
      CACHE.clear();
      getBookMarksFetch({ type: REQUEST, params: [userId] });
    }
  }, [userId, pageNum]);

  const modeToggleHandler = useCallback(() => {
    setIsRemoveMode(!isRemoveMode);
  }, [isRemoveMode]);

  const onClickCard = useCallback(
    (docId: string) => () => {
      if (!isRemoveMode) {
        // push to post page
        return Router.push(`${routes.POST}/${docId}`);
      }
      // remove from bookmark List
      removeBookMarkFetch({ type: REQUEST, params: [userId, docId] });
    },
    [isRemoveMode]
  );

  return (
    <S.Container>
      <Button
        theme="outlinedInfo"
        size="medium"
        width="100px"
        onClick={modeToggleHandler}>
        {isRemoveMode ? '돌아가기' : '수정하기'}
      </Button>
      {reviewList.length > 0 &&
        reviewList.map((v) => (
          <S.Card
            key={v.docId}
            css={isRemoveMode && S.removeMode}
            onClick={onClickCard(v.docId)}>
            <S.PlaceInfoContainer>
              <S.PlaceName>{v.placeInfo.place_name}</S.PlaceName>
              <S.AddressName>{v.placeInfo.address_name}</S.AddressName>
            </S.PlaceInfoContainer>
            {isRemoveMode && <Icon icon={faTimes} size="medium" />}
          </S.Card>
        ))}
      {totalLength > 0 && (
        <Pagination
          nowPage={pageNum}
          lastPage={Math.ceil(totalLength / BOOKMARK_DATA_LIMIT)}
        />
      )}
    </S.Container>
  );
};

export default BookMarkList;
