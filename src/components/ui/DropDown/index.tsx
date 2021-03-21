import React, { useCallback } from 'react';
import Link from 'next/link';
import * as S from './style';

export interface Props {
  menuList: {
    title: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
  }[];
  closeHanlder?: () => void;
}

const DropDown = ({ menuList, closeHanlder }: Props) => {
  /** after excuting Menu's onClick function, close Dropdown */
  const clickHanlder = useCallback(
    (onClick?: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      onClick && onClick(e);
      closeHanlder && closeHanlder();
    },
    []
  );

  return (
    <S.Container>
      {menuList.map((v, i) => {
        return v.href ? (
          <Link href={v.href} key={i}>
            <S.Menu onClick={closeHanlder}>
              <a>{v.title}</a>
            </S.Menu>
          </Link>
        ) : (
          <S.Menu key={i} onClick={clickHanlder(v.onClick)}>
            {v.title}
          </S.Menu>
        );
      })}
    </S.Container>
  );
};

export default DropDown;
