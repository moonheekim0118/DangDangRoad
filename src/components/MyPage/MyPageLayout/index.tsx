import React, { useEffect, useCallback } from 'react';
import PageMenu from '../PageMenu';
import UserCard from '../UserCard';
import { Modal } from 'components/ui';
import { Title, Button, Loading } from 'atoms';
import { useModal, useApiFetch } from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { UserType } from 'types/User';
import {
  DESTROY_ACCOUNT_CAPTION,
  CANCLE_BUTTON_CAPTION,
  DESTROY_BUTTON_CAPTION,
} from 'common/constant/string';
import { DESTROY_ACCOUNT_TERM } from 'common/constant/terms';
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
        <S.DestroyConfirmContainer>
          {DESTROY_ACCOUNT_TERM}
          <S.DestroyTitle>{DESTROY_ACCOUNT_CAPTION}</S.DestroyTitle>
          <S.DestroyButtonContainer>
            <Button
              theme="danger"
              size="large"
              width="35%"
              onClick={DestroyHandler}>
              {DESTROY_BUTTON_CAPTION}
            </Button>
            <Button
              theme="info"
              size="large"
              width="35%"
              onClick={modalHandler}>
              {CANCLE_BUTTON_CAPTION}
            </Button>
          </S.DestroyButtonContainer>
        </S.DestroyConfirmContainer>
      </Modal>
    </S.Container>
  );
};

export default MyPage;
