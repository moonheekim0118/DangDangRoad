import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import routes from 'common/constant/routes';
import dynamic from 'next/dynamic';
import { useUser, useIntersectionObserver } from 'hooks';
import { LOGO_IMAGE, LOGO_IMAGE_ALT } from 'common/constant/images';
import { Button } from 'components/ui';

const HomeDescription = dynamic(
  () => import('components/common/HomeDescription')
);

const Index = (): React.ReactElement => {
  useUser();
  const [showPostExample, setShowPostExample] = useState<'show' | 'hide' | ''>(
    ''
  );

  const openExamplePost = useCallback(() => {
    setShowPostExample('show');
  }, []);

  const closeExamplePost = useCallback(() => {
    setShowPostExample('hide');
  }, []);

  const examplePostObserverTarget = useIntersectionObserver({
    fetcher: openExamplePost,
    removeFetcher: closeExamplePost,
  });

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
          <Button
            href={routes.SEARCH}
            theme="special"
            size="large"
            width="100%">
            산책로 리뷰 보기
          </Button>
        </SubContetns>
        <Image src={LOGO_IMAGE} alt={LOGO_IMAGE_ALT} width={600} height={500} />
      </MainContents>
      <Description>오늘 반려견을 위해 댕댕로드에 가입하세요!</Description>
      <Observer ref={examplePostObserverTarget} />
      {showPostExample !== '' && <HomeDescription show={showPostExample} />}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  background-color: #0277bc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  color: #fff;
  > * {
    margin: 1.2rem 0;
  }
`;

const MainContents = styled.div`
  display: flex;

  @media only screen and (max-width: 780px) {
    flex-direction: column-reverse;
  }
`;

const SubContetns = styled.div`
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

const Description = styled.h1`
  color: #fff;
  margin-bottom: 120px;
  text-align: center;

  @media only screen and (max-width: 780px) {
    margin-bottom: 70px;
  }
`;

const Observer = styled.div`
  @media only screen and (max-width: 780px) {
    position: sticky;
    top: 0;
  }
`;

export default Index;
