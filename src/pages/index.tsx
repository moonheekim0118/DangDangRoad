import React from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import useUser from 'libs/useUser';
import styled from '@emotion/styled';
import routes from 'common/constant/routes';
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
          <Link href={routes.SEARCH}>
            <a>
              <Button color="white">산책로 리뷰 보기</Button>
            </a>
          </Link>
        </SubContetns>
        <Image src={LOGO_IMAGE} alt={LOGO_IMAGE_ALT} width="600" height="500" />
      </MainContents>
    </Container>
  );
};

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
