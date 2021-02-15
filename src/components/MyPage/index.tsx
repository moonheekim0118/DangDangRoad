import React from 'react';
import PageMenu from './PageMenu';
import UserCard from './UserCard';
import Loading from 'components/Loading';
import { colorCode } from 'types/colorCode';
import * as Menus from 'util/myPageDatas';
import styled from '@emotion/styled';

interface Props {
  userInfo: {
    nickname: string;
    email: string;
    profilePic: string;
  };
  pageName?: string;
  children: React.ReactNode;
}

const MyPage = ({ userInfo, pageName = 'My Reviews', children }: Props) => {
  return (
    <Container>
      <SideContainer>
        {userInfo ? (
          <UserCard
            userName={userInfo.nickname}
            userEmail={userInfo.email}
            userImgUrl={userInfo.profilePic}
          />
        ) : (
          <Loading />
        )}
        <PageMenu datas={Menus.GeneralMenu} />
        <PageMenu datas={Menus.DestoryMenu} />
      </SideContainer>
      <MainContainer>
        <MainTitle>{pageName}</MainTitle>
        {children}
      </MainContainer>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const SideContainer = styled.aside`
  width: 250px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 25px;
  @media only screen and (max-width: 500px) {
    width: 100%;
    margin: 0;
  }
`;

const MainContainer = styled.article`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  @media only screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }
`;

const MainTitle = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.6rem;
  position: absolute;
  top: 20px;
  right: 20px;

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    top: 0px;
    left: -20px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${colorCode['blue']};
  }

  @media only screen and (max-width: 500px) {
    position: relative;
    top: 0;
    right: 0;
    margin: 20px 0;
  }
`;

export default MyPage;
