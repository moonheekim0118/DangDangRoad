import React, { useCallback } from 'react';
import { SerializedStyles } from '@emotion/react';
import { useCloseDropdown } from 'hooks';
import Link from 'next/link';
import * as S from './style';

interface Props {
  /** detail Container styling */
  detailStyle?: SerializedStyles;
  /** menu Container styling */
  menuStyle?: SerializedStyles;
  /** children for summary */
  children: React.ReactNode;
  /** menu List for dropdown menu */
  menuList: {
    title: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
  }[];
}

const DetailsDropdown = ({
  detailStyle,
  menuStyle,
  children,
  menuList,
}: Props) => {
  const [detailRef, handleCloseDropdown] = useCloseDropdown();

  const clickHanlder = useCallback(
    (onClick?: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      onClick && onClick(e);
      handleCloseDropdown();
    },
    []
  );

  return (
    <details css={detailStyle} ref={detailRef}>
      {children}
      <S.Container css={menuStyle}>
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

export default DetailsDropdown;
