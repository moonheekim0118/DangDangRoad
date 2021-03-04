import React from 'react';
import PageMenu from '../PageMenu';
import UserCard from '../UserCard';
import Modal from 'components/ui/Modal';
import Loading from 'components/ui/Loading';
import ConfirmPopUp from 'components/ui/ConfirmPopUp';
import { Title } from 'atoms';
import { useDestroyAccount } from 'hooks';
import { UserType } from 'types/User';
import { DESTROY_ACCOUNT_CAPTION } from 'common/constant/string';
import * as menus from 'common/constant/mypageDatas';
import styled from '@emotion/styled';

interface Props {
  userInfo: UserType;
  pageName: string;
  children: React.ReactNode;
}

const MyPage = ({
  userInfo,
  pageName,
  children,
}: Props): React.ReactElement => {
  const data = useDestroyAccount(userInfo.userId);

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
        <PageMenu datas={menus.GeneralMenu} />
        <PageMenu datas={menus.DestoryMenu} onClick={data.modalHandler} />
      </SideContainer>
      <MainContainer>
        <TitleContainer>
          <Title>{pageName}</Title>
        </TitleContainer>
        {children}
      </MainContainer>
      <Modal showModal={data.showModal} modalHandler={data.modalHandler}>
        <ConfirmPopUp
          contents={DESTROY_ACCOUNT_CAPTION}
          closeHandler={data.modalHandler}
          submitHandler={data.DestroyHandler}
        />
      </Modal>
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

const TitleContainer = styled.span`
  position: absolute;
  top: 15px;
  right: 20px;
`;

export default MyPage;
