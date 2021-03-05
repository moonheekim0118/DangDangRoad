import React, { memo, ButtonHTMLAttributes } from 'react';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/Link';
import styled from '@emotion/styled';

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
      <Anchor css={linkStyle}>{children}</Anchor>
    </Link>
  ) : (
    <Component
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </Component>
  );
};

const Component = styled.button`
  font-size: 1.2rem;
  background-color: inherit;
  color: inherit;
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 13px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
  }
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default memo(Button);
