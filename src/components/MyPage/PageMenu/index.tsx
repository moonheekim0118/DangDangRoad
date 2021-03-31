import React, { useCallback } from 'react';
import Router from 'next/router';
import { Link } from 'components/UI';
import * as S from './style';

interface DataTypes {
  key: number;
  icon: React.ReactElement;
  title: string;
  href?: string;
}

interface Props {
  /** each menu data */
  datas: Array<DataTypes>;
  onClick?: () => void;
}

const PageMenu = ({ datas, onClick }: Props): React.ReactElement => {
  const checkPath = useCallback(
    (pathname: string): boolean => {
      return Router.pathname === pathname;
    },
    [Router.query.page_name]
  );

  return (
    <S.Container>
      {datas.map((v) => (
        <S.MenuList
          key={v.key}
          onClick={onClick}
          warn={v.title === '계정 삭제'}
          visiting={v.href !== undefined && checkPath(v.href)}>
          {v.icon}
          {v.href ? (
            <Link href={v.href} align="right" size="medium">
              {v.title}
            </Link>
          ) : (
            <span>{v.title}</span>
          )}
        </S.MenuList>
      ))}
    </S.Container>
  );
};

export default PageMenu;
