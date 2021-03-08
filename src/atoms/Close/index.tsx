import React from 'react';
import { Icon } from 'atoms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';

interface Props {
  closeHanlder: () => void;
}

const Close = ({ closeHanlder }: Props) => {
  return (
    <S.Container onClick={closeHanlder}>
      <Icon icon={faTimes} className="closeIcon" css={S.iconStyle} />
    </S.Container>
  );
};

export default Close;
