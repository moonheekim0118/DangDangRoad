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
import * as S from './style';

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
    <S.Container>
      <S.SideContainer>
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
      </S.SideContainer>
      <S.MainContainer>
        <S.TitleContainer>
          <Title>{pageName}</Title>
        </S.TitleContainer>
        {children}
      </S.MainContainer>
      <Modal showModal={data.showModal} modalHandler={data.modalHandler}>
        <ConfirmPopUp
          contents={DESTROY_ACCOUNT_CAPTION}
          closeHandler={data.modalHandler}
          submitHandler={data.DestroyHandler}
        />
      </Modal>
    </S.Container>
  );
};

export default MyPage;
