import React from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Author } from 'components/UI';
import { colorCode } from 'common/style/color';

const About = () => {
  return (
    <div>
      <Head>
        <title>댕댕로드 | 어바웃</title>
        <meta property="og:title" content="댕댕로드 어바웃" key="ogtitle" />
        <meta property="og:description" content="댕댕로드 소개" key="ogdesc" />
      </Head>
      <Container>
        <Heading>댕댕로드에 대하여</Heading>
        <p>
          댕댕로드는 온 세상 강아지들이 더 행복한 산책을 했으면 하는 마음에서
          시작되었습니다
        </p>
        <p>늘 같은 곳만 산책하셔서 지겹지 않으신가요? </p>
        <p>
          댕댕로드에서 산책로 후기를 공유하고, 오늘 강아지와 함께 떠나보세요!
        </p>
      </Container>
      <Container>
        <Heading>댕댕로드에 기여해주시면 감사하겠습니다</Heading>
        <p>
          1. 산책로 후기를 공유해주셔서 많은 사용자들과 강아지들이 더 행복한
          산책을 떠나게 도와주세요!
        </p>
        <p>
          2. 혹시 버그를 발견하셨다면{' '}
          <a href="https://github.com/moonheekim0118/DangDangRoad">
            레포지토리
          </a>
          에 보고해주세요! 댕댕로드는 오픈소스로서, 당신의 참여를 늘 기다려요{' '}
        </p>
        <p>
          3. 댕댕로드에 대한 당신의 의견을 알려주세요! <br /> 상단의 레포지토리
          혹은 <strong>hellomooneekim@gmail.com</strong>으로 댕댕로드에 대한
          의견을 알려주시면 감사하겠습니다
        </p>
      </Container>
      <Author
        userData={{
          nickname: '개발자 부기언니 올림',
          profilePic:
            'https://avatars.githubusercontent.com/u/61469664?s=460&u=9a1e1b476dd2536382b122087677ecbfe0be7057&v=4',
        }}
        size="medium"
      />
    </div>
  );
};

const Container = styled.div`
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-family: 'Do Hyeon', sans-serif;
  border-bottom: 2px solid ${colorCode['dark-blue']};
  margin-bottom: 1.5rem;
  transition: color 0.5s ease;
  &:hover {
    color: ${colorCode['dark-blue']};
  }
`;

export default About;
