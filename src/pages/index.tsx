import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import routes from 'common/constant/routes';
import { css } from '@emotion/react';
import { useUser } from 'hooks';
import { colorCode } from 'common/style/color';
import { baseButtonStyle } from 'common/style/baseStyle';
import { LOGO_IMAGE, LOGO_IMAGE_ALT } from 'common/constant/images';
import { Button } from 'atoms';

const Index = (): React.ReactElement => {
  useUser();
  return (
    <Container>
      <MainContents>
        <SubContetns>
          <MainTitle>
            반려견과의
            <br />
            산책을
            <br /> 더욱
            <br /> 성공적이개
          </MainTitle>
          <Button href={routes.SEARCH} linkStyle={buttonStyle}>
            산책로 리뷰 보기
          </Button>
        </SubContetns>
        <Image src={LOGO_IMAGE} alt={LOGO_IMAGE_ALT} width="600" height="500" />
      </MainContents>
    </Container>
  );
};

const buttonStyle = css`
  background-color: #fff;
  color: ${colorCode['blue']};
  ${baseButtonStyle}

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(244, 244, 244, 0.75);
  }
`;

const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #0277bc;

  display: grid;
  place-items: center;

  color: #fff;
`;

const MainContents = styled.section`
  display: flex;

  @media only screen and (max-width: 780px) {
    flex-direction: column-reverse;
  }
`;

const SubContetns = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 30px;
`;

const MainTitle = styled.div`
  font-size: 60px;
  margin: 40px 0;

  @media only screen and (max-width: 780px) {
    display: none;
  }
`;

export default Index;
