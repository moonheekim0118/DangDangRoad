import React from 'react';
import * as S from './style';
import { Icon } from 'atoms';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faInfoCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

export interface Props {
  children: React.ReactNode;
  theme: 'success' | 'info' | 'fail';
  size: 'large' | 'medium' | 'small';
  show: boolean;
  animation: boolean;
}

const icons = {
  success: faCheckCircle,
  info: faInfoCircle,
  fail: faExclamationTriangle,
};

const Toast = ({ children, theme, size, show, animation }: Props) => {
  return (
    <S.Container>
      <div
        css={[
          S.style,
          S.themes[theme],
          S.sizes[size],
          show && animation ? S.showAnimation : '',
        ]}>
        <Icon icon={icons[theme]} size={size} />
        <span>{children}</span>
      </div>
    </S.Container>
  );
};

export default Toast;
