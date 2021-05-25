import React, { useState, useEffect } from 'react';
import BookMark from 'types/BookMark';
import useApiFetch, { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { getBookMarkedReviews, removeBookMarkReview } from 'api/bookmark';
import { Button, Icon, Loading } from 'components/UI';
import { Pagination } from 'components/MyPage';
import {
  EMPTY_BOOKMARK_TITLE,
  CANCLE_BUTTON_CAPTION,
  UPDATE_BUTTON_CAPTION,
} from 'common/constant/string';
import { BOOKMARK_DATA_LIMIT } from 'common/constant/number';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import routes from 'common/constant/routes';
import Router from 'next/router';
import cacheProto from 'util/cache';
import * as S from './style';

interface Props {
  userId: string;
  pageNum: number;
}

const CACHE = new cacheProto<BookMark[]>();
let CACHED_USER = '';

const parseList = (array: any[], pageNum: number) => {
  const end = pageNum * BOOKMARK_DATA_LIMIT;
  const start = end - 4;
  return array.slice(start - 1, end);
};

const BookMarkList = ({ userId, pageNum }: Props) => {
  const [totalLength, setTotalLength] = useState<number>(0);
  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<BookMark[]>([]);

  const [getResult, getDispatch, getSetDefault] = useApiFetch<BookMark[]>(
    getBookMarkedReviews
  );

  const [removeResult, removeDispatch, removeSetDefault] = useApiFetch<string>(
    removeBookMarkReview
  );

  const totalPages = Math.ceil(totalLength / BOOKMARK_DATA_LIMIT);

  useEffect(() => {
    if (userId) {
      if (CACHED_USER === userId && CACHE.has(userId)) {
        const cachedData = CACHE.get(userId);
        if (cachedData) {
          setReviewList(parseList(cachedData, pageNum));
          setTotalLength(cachedData.length);
        }
      } else {
        CACHED_USER = userId;
        CACHE.clear();
        getDispatch({ type: REQUEST, params: [userId] });
      }
    }
  }, [userId, pageNum]);

  useEffect(() => {
    if (getResult.type !== SUCCESS) return;
    const bookMarkList = getResult.data ?? [];
    setTotalLength(bookMarkList.length);
    setReviewList(parseList(bookMarkList, pageNum));
    CACHE.set(userId, bookMarkList, bookMarkList.length);
    getSetDefault();
  }, [getResult]);

  useEffect(() => {
    if (removeResult.type !== SUCCESS) return;
    const postId = removeResult.data;
    const cachedData = CACHE.get(userId);
    if (postId && cachedData) {
      const updatedList = cachedData.filter((data) => data.docId !== postId);
      setReviewList(parseList(updatedList, pageNum));
      setTotalLength(cachedData.length - 1);
      CACHE.set(userId, updatedList, updatedList.length);
    }
    removeSetDefault();
  }, [removeResult]);

  const modeToggleHandler = () => {
    setIsRemoveMode(!isRemoveMode);
  };

  const onClickCard = (docId: string) => () => {
    if (!isRemoveMode) {
      return Router.push(`${routes.POST}/${docId}`);
    }
    removeDispatch({ type: REQUEST, params: [userId, docId] });
  };

  return (
    <S.Container>
      {getResult.type === REQUEST || getResult.type === SUCCESS ? (
        <Loading />
      ) : (
        <>
          {reviewList.length > 0 ? (
            <>
              <Button
                theme="outlinedInfo"
                size="medium"
                width="100px"
                onClick={modeToggleHandler}>
                {isRemoveMode ? CANCLE_BUTTON_CAPTION : UPDATE_BUTTON_CAPTION}
              </Button>
              {reviewList.map((v) => (
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
              <Pagination currentPage={pageNum} totalPage={totalPages} />
            </>
          ) : (
            <div>{EMPTY_BOOKMARK_TITLE}</div>
          )}
        </>
      )}
    </S.Container>
  );
};

export default BookMarkList;
