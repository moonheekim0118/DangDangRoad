import React from 'react';
import { Icon } from 'atoms';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationInfo } from 'types/Navigation';
import * as S from './style';

const PrevNextButton = ({
  prevHandler,
  nextHandler,
  hasPrev,
  hasNext,
  location = -50,
}: NavigationInfo) => {
  return (
    <>
      {hasPrev && (
        <S.Container left={true} location={location}>
          <Icon
            icon={faChevronLeft}
            className="prevIcon"
            css={S.iconStyle}
            onClick={prevHandler}
          />
        </S.Container>
      )}
      {hasNext && (
        <S.Container location={location}>
          <Icon
            icon={faChevronRight}
            className="nextIcon"
            css={S.iconStyle}
            onClick={nextHandler}
          />
        </S.Container>
      )}
    </>
  );
};

export default PrevNextButton;
