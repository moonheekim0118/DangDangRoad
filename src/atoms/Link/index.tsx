import React from 'react';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import defaultStyle from './style';
import { anchorStyle } from 'atoms/Button/style';

interface Props {
  children: React.ReactNode;
  href: string;
  style?: SerializedStyles;
}

const LinkComponent = ({
  children,
  href,
  style,
}: Props): React.ReactElement => {
  return (
    <Link href={href}>
      <a css={anchorStyle}>
        <div css={[defaultStyle, style]}>{children}</div>
      </a>
    </Link>
  );
};

export default LinkComponent;
