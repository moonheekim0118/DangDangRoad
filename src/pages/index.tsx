import React from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import Button from '../atoms/Button';
import Logo from '../components/Logo';
import styled from '@emotion/styled';
import SearchBar from '../components/SearchBar';
import getAuthentication from '../libs/getAuthentication';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getAuthentication(context);

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
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
          {!props.authenticated && (
            <Link href="/login">
              <a>
                <Button color="white">로그인하고 산책로 리뷰하기</Button>
              </a>
            </Link>
          )}
          <SearchBarContainer>
            <SearchBar color="white" />
          </SearchBarContainer>
        </SubContetns>
        <Image src="/logo.png" alt="" width="600" height="500" />
      </MainContents>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #0277bc;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;

  z-index: 10000;
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

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  margin: 25px 0;
`;

export default Index;
