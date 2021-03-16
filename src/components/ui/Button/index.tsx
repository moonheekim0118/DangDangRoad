import React, { memo, ButtonHTMLAttributes } from 'react';
import { Loading } from 'components/ui';
import Link from 'next/link';
import * as S from './style';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** text of button */
  children: string | React.ReactNode;
  /** routing */
  href?: string;
  /** type of button */
  type?: 'button' | 'submit' | 'reset';
  /** loading or not */
  loading?: boolean;
  /** button theme */
  theme?:
    | 'primary'
    | 'info'
    | 'danger'
    | 'outlinedPrimary'
    | 'outlinedInfo'
    | 'outlinedDanger'
    | 'special'
    | 'default';
  /** button size */
  size: 'large' | 'medium' | 'small';
  /** width */
  width: number | string;
  /** onClick function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props): React.ReactElement => {
  const {
    children,
    href,
    type = 'button',
    loading = false,
    theme = 'default',
    size,
    width,
    onClick,
    ...rest
  } = props;
  return href ? ( // when it needs to be link
    <Link href={href}>
      <a css={S.anchorStyle}>
        <S.Button
          type="button"
          css={[S.themes[theme], S.sizes[size], { width }]}>
          {children}
        </S.Button>
      </a>
    </Link>
  ) : (
    <S.Button
      type={type}
      css={[S.themes[theme], S.sizes[size], { width }]}
      onClick={onClick}
      {...rest}>
      {loading ? <Loading size="small" color="light-gray" /> : children}
    </S.Button>
  );
};

export default memo(Button);
