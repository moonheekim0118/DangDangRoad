import React, { memo, ButtonHTMLAttributes } from 'react';
import Loading from 'components/ui/Loading';
import Link from 'next/link';
import * as S from './style';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** text of button */
  children: string | React.ReactNode;
  /** routing */
  href?: string;
  /** type of button */
  type?: 'button' | 'submit' | 'reset';
  /** loading or not */
  loading?: boolean;
  /** button theme */
  theme:
    | 'primary'
    | 'info'
    | 'danger'
    | 'outlinedPrimary'
    | 'outlinedInfo'
    | 'outlinedDanger';
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
    className,
    href,
    type = 'button',
    loading = false,
    theme,
    size,
    width,
    onClick,
    ...rest
  } = props;
  return href ? ( // when it needs to be link
    <Link href={href}>
      <a css={S.anchorStyle}>
        <button
          type="button"
          css={[S.style, S.themes[theme], S.sizes[size], { width }]}>
          {children}
        </button>
      </a>
    </Link>
  ) : (
    <button
      type={type}
      css={[S.style, S.themes[theme], S.sizes[size], { width }]}
      onClick={onClick}
      {...rest}>
      {loading ? <Loading size="small" color="light-gray" /> : children}
    </button>
  );
};

export default memo(Button);
