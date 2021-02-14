import React from 'react';
import Icon from 'atoms/Icon';
import PageMenu from './PageMenu';
import UserCard from './UserCard';
import useUser from 'hooks/useUser';
import Loading from 'components/Loading';
import {
  faFileAlt,
  faEdit,
  faUserCircle,
  faSadTear,
} from '@fortawesome/free-regular-svg-icons';
import styled from '@emotion/styled';

interface Props {
  userId: string;
}

const MyPage = ({ userId }: Props) => {
  // Menu Datas, not gonna change
  const [userInfo] = useUser({ userId });

  const MenuDatas = [
    {
      key: 0,
      icon: <Icon iconsize={20} icon={faFileAlt} />,
      title: 'My reviews',
      href: '/',
    },
    {
      key: 1,
      icon: <Icon iconsize={20} icon={faUserCircle} />,
      title: 'edit profile',
    },
    {
      key: 2,
      icon: <Icon iconsize={20} icon={faEdit} />,
      title: 'update password',
    },
  ];

  const DestroyData = [
    {
      key: 3,
      icon: <Icon iconsize={20} icon={faSadTear} color="red" />,
      title: 'destroy account',
    },
  ];

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
        <PageMenu datas={MenuDatas} />
        <PageMenu datas={DestroyData} />
      </SideContainer>
      <ReviewContainer>우와~</ReviewContainer>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const SideContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 250px;
  height: 80%;
  margin-right: 25px;
  @media only screen and (max-width: 500px) {
    width: 100%;
    margin: 0;
  }
`;

const ReviewContainer = styled.article`
  width: 60%;
  height: 80%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  @media only screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }
`;

export default MyPage;
