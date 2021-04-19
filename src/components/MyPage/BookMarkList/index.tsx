import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BookMark from 'types/BookMark';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { useApiFetch } from 'hooks';
import { getBookMarkedReviews, removeBookMarkReview } from 'api/bookmark';
import { BOOKMARK_DATA_LIMIT } from 'common/constant/number';
import { Button, Icon, Loading } from 'components/UI';
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

const CACHE = new cacheProto<BookMark[]>();
let CACHED_USER = '';

const sliceArray = (array: any[], pageNum: number) => {
  const end = pageNum * BOOKMARK_DATA_LIMIT;
  const start = end - 4;
  return array.slice(start - 1, end);
};

const BookMarkList = ({ userId, pageNum }: Props) => {
  const [totalLength, setTotalLength] = useState<number>(0);
  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<BookMark[]>([]);

  const [
    getBookMarksResult,
    getBookMarksFetch,
    getBookMarksSetDefault,
  ] = useApiFetch<BookMark[]>(getBookMarkedReviews);

  const [
    removeBookMarkResult,
    removeBookMarkFetch,
    removeBookMarkSetDefault,
  ] = useApiFetch<string>(removeBookMarkReview);

  useEffect(() => {
    if (userId) {
      if (CACHED_USER === userId && CACHE.has(userId)) {
        const cachedData = CACHE.get(userId);
        if (cachedData) {
          setReviewList(sliceArray(cachedData, pageNum));
          setTotalLength(cachedData.length);
        }
      } else {
        CACHED_USER = userId;
        CACHE.clear();
        getBookMarksFetch({ type: REQUEST, params: [userId] });
      }
    }
  }, [userId, pageNum]);

  useEffect(() => {
    if (getBookMarksResult.type === SUCCESS) {
      const bookMarkList = getBookMarksResult.data ?? [];
      setTotalLength(bookMarkList.length);
      setReviewList(sliceArray(bookMarkList, pageNum));
      CACHE.set(userId, bookMarkList, bookMarkList.length);
      getBookMarksSetDefault();
    }
  }, [getBookMarksResult]);

  useEffect(() => {
    if (removeBookMarkResult.type === SUCCESS) {
      const postId = removeBookMarkResult.data;
      const cachedData = CACHE.get(userId);
      if (postId && cachedData) {
        const updatedList = cachedData.filter((v) => v.docId !== postId);
        setReviewList(sliceArray(updatedList, pageNum));
        setTotalLength(cachedData.length - 1);
        CACHE.set(userId, updatedList, updatedList.length);
      }
      removeBookMarkSetDefault();
    }
  }, [removeBookMarkResult]);

  // cacluate Total Pages number
  const totalPages = useMemo(() => {
    return Math.ceil(totalLength / BOOKMARK_DATA_LIMIT);
  }, [totalLength]);

  // to set Mode (remove or general)
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
      {getBookMarksResult.type === REQUEST ||
      getBookMarksResult.type === SUCCESS ? (
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
                {isRemoveMode ? '돌아가기' : '수정하기'}
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
            <div>아직 북마크가 없습니다</div>
          )}
        </>
      )}
    </S.Container>
  );
};

export default BookMarkList;
