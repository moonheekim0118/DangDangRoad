import React, { useEffect, useCallback } from 'react';
import PageMenu from '../PageMenu';
import UserCard from '../UserCard';
import Modal from 'components/ui/Modal';
import Loading from 'components/ui/Loading';
import ConfirmPopUp from 'components/ui/ConfirmPopUp';
import { Title } from 'atoms';
import { useModal, useApiFetch } from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { UserType } from 'types/User';
import { DESTROY_ACCOUNT_CAPTION } from 'common/constant/string';
import { destroyAccount } from 'api/user';
import routes from 'common/constant/routes';
import Router from 'next/router';
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
  const [showModal, modalHandler] = useModal(false);
  const [destroyResult, destroyDispatch] = useApiFetch(destroyAccount);

  useEffect(() => {
    if (destroyResult.type === SUCCESS) {
      modalHandler();
      Router.push(routes.HOME);
    }
  }, [destroyResult.type]);

  const DestroyHandler = useCallback(() => {
    destroyDispatch({ type: REQUEST, params: [userInfo.userId] });
  }, []);

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
        <PageMenu datas={menus.DestoryMenu} onClick={modalHandler} />
      </S.SideContainer>
      <S.MainContainer>
        <S.TitleContainer>
          <Title>{pageName}</Title>
        </S.TitleContainer>
        {children}
      </S.MainContainer>
      <Modal showModal={showModal} modalHandler={modalHandler}>
        <ConfirmPopUp
          contents={DESTROY_ACCOUNT_CAPTION}
          closeHandler={modalHandler}
          submitHandler={DestroyHandler}
        />
      </Modal>
    </S.Container>
  );
};

export default MyPage;
