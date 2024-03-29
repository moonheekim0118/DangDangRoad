import { useEffect, useState } from 'react';
import { Icon } from 'components/UI';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { BOOKMARK_DATA_LIMIT } from 'common/constant/number';
import routes from 'common/constant/routes';
import Router from 'next/router';
import * as S from './style';

interface Props {
  totalPage: number;
  currentPage: number;
}

const Pagination = ({ totalPage, currentPage }: Props) => {
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(totalPage);
  const [pages, setPages] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    let end = currentPage;
    let start = 1;
    if (currentPage % 5 === 0) {
      start = end - 4;
    } else {
      while (end % 5 !== 0) {
        if (end === totalPage) break;
        end++;
      }
      if (end - 4 > 1) start = end - 4;
    }
    setEndPage(end);
    setStartPage(start);
    const elements = [] as React.ReactElement[];
    while (start <= end) {
      elements.push(
        <S.PageButton
          key={start}
          onClick={pageNateHandler(start)}
          current={start === currentPage}>
          {start}
        </S.PageButton>
      );
      start++;
    }
    setPages(elements);
  }, [currentPage, totalPage]);

  const pageNateHandler = (id: number) => () => {
    Router.push({
      pathname: routes.MYPAGE_BOOKMARK,
      query: {
        page: id,
      },
    });
  };

  return (
    <S.Container>
      {startPage >= BOOKMARK_DATA_LIMIT && (
        <S.PageButton onClick={pageNateHandler(endPage - 5)}>
          <Icon icon={faChevronLeft} size="medium" />
        </S.PageButton>
      )}
      {pages.map((page) => page)}
      {endPage < totalPage && (
        <S.PageButton onClick={pageNateHandler(startPage + 5)}>
          <Icon icon={faChevronRight} size="medium" />
        </S.PageButton>
      )}
    </S.Container>
  );
};

export default Pagination;
