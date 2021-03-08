import React from 'react';
import { Icon, Button } from 'atoms';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { WRITE_REVIEW_BUTTON_CAPTION } from 'common/constant/string';
import routes from 'common/constant/routes';
import * as S from './style';

const WriteButton = () => {
  return (
    <S.Container>
      <Button href={routes.WRITE_REIVEW}>
        <S.WriteComponent>
          <Icon icon={faFeather} className="writeIcon" css={S.iconStyle} />
          <S.Description>{WRITE_REVIEW_BUTTON_CAPTION}</S.Description>
        </S.WriteComponent>
      </Button>
    </S.Container>
  );
};
export default WriteButton;
