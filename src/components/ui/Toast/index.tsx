import React from 'react';
import * as S from './style';
import { Icon } from 'components/ui';
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

const Toast = ({
  children,
  theme,
  size,
  show,
  animation,
}: Props): React.ReactElement => {
  return (
    <S.Container>
      <S.Component
        css={[
          S.themes[theme],
          S.sizes[size],
          show && animation && S.showAnimation,
        ]}>
        <Icon icon={icons[theme]} size={size} />
        <S.Message>{children}</S.Message>
      </S.Component>
    </S.Container>
  );
};

export default Toast;
