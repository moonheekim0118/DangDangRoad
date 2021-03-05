import React from 'react';
import { css } from '@emotion/react';
import { Icon, Button } from 'atoms';
import { colorCode } from 'common/style/color';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { WRITE_REVIEW_BUTTON_CAPTION } from 'common/constant/string';
import routes from 'common/constant/routes';
import styled from '@emotion/styled';

const WriteButton = () => {
  return (
    <Container>
      <Button href={routes.WRITE_REIVEW}>
        <WriteComponent>
          <Icon icon={faFeather} className="writeIcon" css={iconStyle} />
          <Description>{WRITE_REVIEW_BUTTON_CAPTION}</Description>
        </WriteComponent>
      </Button>
    </Container>
  );
};

const iconStyle = css`
  width: 30px;
  height: 30px;
`;

const Description = styled.span`
  text-align: center;
  display: none;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 50px;
  z-index: 1000;
`;

const WriteComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorCode['blue']};
  color: #fff;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  z-index: 2001;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    width: 250px;
    border-radius: 25px;
    justify-content: space-around;
  }

  &:hover > ${Description} {
    display: block;
  }
`;

export default WriteButton;
