import React from 'react';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { anchorStyle } from 'atoms/Button/style';
import * as S from './style';

export interface Props {
  /** inner children */
  children: React.ReactNode;
  /** href link */
  href: string;
  /** inner item align */
  align: 'left' | 'right' | 'center';
  /** size */
  size: 'large' | 'medium' | 'small';
  /** themes */
  theme?: 'primary' | 'secondary' | 'default';
  /** custom styling */
  style?: SerializedStyles;
  /** width of component */
  width?: string | number;
}

const LinkComponent = ({
  children,
  align,
  size,
  theme = 'default',
  href,
  style,
  width,
}: Props): React.ReactElement => {
  return (
    <Link href={href}>
      <a css={anchorStyle}>
        <S.Component
          css={[
            style,
            S.aligns[align],
            S.sizes[size],
            S.themes[theme],
            { width },
          ]}>
          {children}
        </S.Component>
      </a>
    </Link>
  );
};

export default LinkComponent;
