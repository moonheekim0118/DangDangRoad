import React from 'react';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import defaultStyle from './style';
import { sizes, anchorStyle } from 'atoms/Button/style';

interface Props {
  children: React.ReactNode;
  href: string;
  size?: 'large' | 'medium' | 'small';
  width?: string | number;
  style?: SerializedStyles;
}

const LinkComponent = ({
  children,
  href,
  size,
  width,
  style,
}: Props): React.ReactElement => {
  return (
    <Link href={href}>
      <a css={anchorStyle}>
        <div css={[defaultStyle, sizes[size || ''], style, { width }]}>
          {children}
        </div>
      </a>
    </Link>
  );
};

export default LinkComponent;
