import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from 'components/ui';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as S from './style';

interface Props {
  lastPage: number;
  nowPage: number;
}

const Pagination = ({ lastPage, nowPage }: Props) => {
  const [pageElements, setPageElement] = useState<JSX.Element[]>([]);

  const pageNateHandler = useCallback(
    (id: number) => () => {
      Router.push({
        pathname: routes.MYPAGE_BOOKMARK,
        query: {
          page: id,
        },
      });
    },
    []
  );

  useEffect(() => {
    const temp = [
      <div key={nowPage} onClick={pageNateHandler(nowPage)}>
        {nowPage}
      </div>,
    ] as JSX.Element[];
    for (let i = 1; i < 4; i++) {
      const pageNumber = nowPage + i;
      if (pageNumber >= lastPage) break;
      temp.push(
        <div key={pageNumber} onClick={pageNateHandler(pageNumber)}>
          {pageNumber}
        </div>
      );
    }
    setPageElement(temp);
  }, [nowPage, lastPage]);
  return (
    <S.Container>
      {nowPage >= 5 && (
        <div>
          <Icon icon={faChevronLeft} size="medium" />
        </div>
      )}
      {nowPage >= 2 && (
        <div>
          <span onClick={pageNateHandler(1)}>1</span>
          <span>...</span>
        </div>
      )}
      {pageElements}
      {lastPage !== nowPage && (
        <div onClick={pageNateHandler(lastPage)}>{lastPage}</div>
      )}
    </S.Container>
  );
};

export default Pagination;
