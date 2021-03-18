import React from 'react';
import Link from 'next/link';
import * as S from './style';

export interface Props {
  menuList: {
    title: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
  }[];
}

const DropDown = ({ menuList }: Props) => {
  return (
    <S.Container>
      {menuList.map((v, i) => {
        return v.href ? (
          <Link href={v.href} key={i}>
            <S.Menu>
              <a>{v.title}</a>
            </S.Menu>
          </Link>
        ) : (
          <S.Menu key={i} onClick={v.onClick}>
            {v.title}
          </S.Menu>
        );
      })}
    </S.Container>
  );
};

export default DropDown;
