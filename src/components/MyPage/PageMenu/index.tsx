import React from 'react';
import Router from 'next/router';
import { Button } from 'atoms';
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
  const pathname = Router.pathname;
  return (
    <S.Container>
      {datas.map((v) => (
        <S.Menu
          key={v.key}
          onClick={onClick}
          warn={v.title === '계정 삭제'}
          visiting={pathname === v.href}>
          {v.icon}
          {v.href ? (
            <Button href={v.href}>{v.title}</Button>
          ) : (
            <span>{v.title}</span>
          )}
        </S.Menu>
      ))}
    </S.Container>
  );
};

export default PageMenu;
