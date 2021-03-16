import React from 'react';
import { Icon, Link } from 'components/ui';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { WRITE_REVIEW_BUTTON_CAPTION } from 'common/constant/string';
import routes from 'common/constant/routes';
import * as S from './style';

const WriteButton = () => {
  return (
    <S.Container>
      <Link href={routes.WRITE_REIVEW} align="center" size="large">
        <S.WriteComponent>
          <Icon icon={faFeather} size="large" />
          <S.Description>{WRITE_REVIEW_BUTTON_CAPTION}</S.Description>
        </S.WriteComponent>
      </Link>
    </S.Container>
  );
};
export default WriteButton;
