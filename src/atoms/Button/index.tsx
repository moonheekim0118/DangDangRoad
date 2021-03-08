import React, { memo, ButtonHTMLAttributes } from 'react';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/Link';
import * as S from './style';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** text of button */
  children: string | React.ReactNode;
  /** routing */
  href?: string;
  /** link css styling */
  linkStyle?: SerializedStyles;
  /** type of button */
  type?: 'button' | 'submit' | 'reset';
  /** disabled or not */
  disabled?: boolean;
  /** loading or not */
  loading?: boolean;
  /** button border */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props): React.ReactElement => {
  const {
    children,
    className,
    href,
    linkStyle,
    loading,
    disabled = false,
    onClick,
    ...rest
  } = props;
  return href ? ( // when it needs to be link
    <Link href={href}>
      <S.Anchor css={linkStyle}>{children}</S.Anchor>
    </Link>
  ) : (
    <S.Component
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </S.Component>
  );
};

export default memo(Button);
