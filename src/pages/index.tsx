import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';
import Logo from '../components/Logo';
import styled from '@emotion/styled';

const Index = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo color="white" />
      </LogoContainer>
      <MainContents>
        <SubContetns>
          <MainTitle>
            반려견과의
            <br />
            산책을
            <br /> 더욱
            <br /> 성공적이개
          </MainTitle>
          <Button color="white">로그인하고 산책로 리뷰하기</Button>
        </SubContetns>
        <Image src="/logo.png" alt="" width="600" height="500" />
      </MainContents>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #0277bc;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  font-size: 72px;
  margin: 40px 0;

  @media only screen and (max-width: 780px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default Index;
