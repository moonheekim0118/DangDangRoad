import React from 'react';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { anchorStyle } from 'atoms/Button/style';
import * as S from './style';

interface Props {
  children: React.ReactNode;
  href: string;
  align: 'left' | 'right' | 'center';
  size: 'large' | 'medium' | 'small';
  style?: SerializedStyles;
  width?: string | number;
}

const LinkComponent = ({
  children,
  align,
  size,
  href,
  style,
  width,
}: Props): React.ReactElement => {
  return (
    <Link href={href}>
      <a css={anchorStyle}>
        <div
          css={[
            S.defaultStyle,
            style,
            S.aligns[align],
            S.sizes[size],
            { width },
          ]}>
          {children}
        </div>
      </a>
    </Link>
  );
};

export default LinkComponent;