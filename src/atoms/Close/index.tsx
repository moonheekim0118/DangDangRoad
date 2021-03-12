import React from 'react';
import { Icon } from 'atoms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

interface Props {
  onClick: () => void;
}

const Close = (props: Props) => {
  return (
    <Icon icon={faTimes} className="closeIcon" css={S.iconStyle} {...props} />
  );
};

export default Close;
