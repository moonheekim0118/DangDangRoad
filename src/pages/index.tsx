import React, { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import routes from 'common/constant/routes';
import { css } from '@emotion/react';
import { useUser, useIntersectionObserver } from 'hooks';
import { colorCode } from 'common/style/color';
import { baseButtonStyle } from 'common/style/baseStyle';
import { LOGO_IMAGE, LOGO_IMAGE_ALT } from 'common/constant/images';
import { Button } from 'atoms';
import { getReviewsCount } from 'api/review';
import Counter from 'components/ui/Counter';
import PostExample from 'components/ui/PostExample';

export async function getStaticProps() {
  return {
    props: {
      reviewSize: await getReviewsCount(),
    },
  };
}

const Index = ({ reviewSize }): React.ReactElement => {
  useUser();

  const counterRef = useRef<HTMLInputElement>(null);
  const [countEnd, setCountEnd] = useState<number>(0);
  const [showPostExample, setShowPostExample] = useState<boolean>(false);

  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.style.opacity = '1';
      counterRef.current.style.transition = 'all 0.5s ease-in-out';
      setCountEnd(reviewSize.data);
    }
  }, []);

  const openExamplePost = useCallback(() => {
    setShowPostExample(true);
  }, []);

  const closeExamplePost = useCallback(() => {
    setShowPostExample(false);
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
          <Button href={routes.SEARCH} linkStyle={buttonStyle}>
            산책로 리뷰 보기
          </Button>
        </SubContetns>
        <Image src={LOGO_IMAGE} alt={LOGO_IMAGE_ALT} width="600" height="500" />
      </MainContents>
      <ReviewCount ref={counterRef}>
        🧾지금 까지 작성된 리뷰 <Counter end={countEnd} duration={1.2} />개
      </ReviewCount>
      <Observer ref={examplePostObserverTarget} />
      <PostExample show={showPostExample} />
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

const Container = styled.section`
  width: 100%;
  background-color: #0277bc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-bottom: 50px;
  color: #fff;
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

const ReviewCount = styled.div`
  opacity: 0;
  font-size: 2rem;
  color: #fff;
  margin-bottom: 120px;

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
