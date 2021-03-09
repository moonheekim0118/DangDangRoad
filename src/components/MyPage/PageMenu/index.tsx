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
  const query = Router.query.page_name;
  return (
    <S.Container>
      {datas.map((v) => (
        <S.Menu
          key={v.key}
          onClick={onClick}
          warn={v.title === '계정 삭제'}
          visiting={`/myPage/${query}` === v.href}>
          {v.icon}
          {v.href ? (
            <Button href={v.href} linkStyle={S.linkStyle}>
              {v.title}
            </Button>
          ) : (
            <span>{v.title}</span>
          )}
        </S.Menu>
      ))}
    </S.Container>
  );
};

export default PageMenu;
