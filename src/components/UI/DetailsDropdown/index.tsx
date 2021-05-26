import React, { useCallback, memo } from 'react';
import { useCloseDropdown } from 'hooks';
import Link from 'next/link';
import * as S from './style';

interface Props {
  theme: 'primary' | 'secondary';
  /** children for summary */
  children: React.ReactNode;
  /** menu List for dropdown menu */
  menuList: {
    title: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
  }[];
}

const DetailsDropdown = ({ theme, children, menuList }: Props) => {
  const [detailRef, handleCloseDropdown] = useCloseDropdown();

  const clickHanlder = useCallback(
    (onClick?: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      onClick && onClick(e);
      handleCloseDropdown();
    },
    []
  );

  return (
    <details css={S.detailThemes[theme]} ref={detailRef}>
      {children}
      <S.Container css={S.menuThemes[theme]}>
        {menuList.map((v, i) => {
          return v.href ? (
            <Link href={v.href} key={i}>
              <S.Menu onClick={handleCloseDropdown}>
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
    </details>
  );
};

export default memo(DetailsDropdown);
