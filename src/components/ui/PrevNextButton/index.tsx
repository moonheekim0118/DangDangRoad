import React from 'react';
import { Icon } from 'atoms';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationInfo } from 'types/Navigation';
import styled from '@emotion/styled';

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
        <Container left={true} location={location}>
          <Icon
            color="white"
            icon={faChevronLeft}
            iconsize={35}
            iconClickHandler={prevHandler}
            cursor="pointer"
          />
        </Container>
      )}
      {hasNext && (
        <Container location={location}>
          <Icon
            color="white"
            icon={faChevronRight}
            iconsize={35}
            iconClickHandler={nextHandler}
            cursor="pointer"
          />
        </Container>
      )}
    </>
  );
};

const Container = styled.div<{ left?: boolean; location: number }>`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left && `${props.location}px`};
  right: ${(props) => !props.left && `${props.location}px`};
  border-radius: 50%;
  z-index: 7500;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default PrevNextButton;
