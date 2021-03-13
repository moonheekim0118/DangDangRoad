import React, { memo, ButtonHTMLAttributes } from 'react';
import { SerializedStyles } from '@emotion/react';
import Loading from 'components/ui/Loading';
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
    type = 'button',
    loading = false,
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
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {loading ? <Loading size="small" color="light-gray" /> : children}
    </S.Component>
  );
};

export default memo(Button);
