import React, { useEffect, useCallback } from 'react';
import { PageMenu, UserCard } from 'components/MyPage';
import { Title, Button, Loading } from 'components/ui';
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
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('components/ui/Modal'));

interface Props {
  /** logged in user Info */
  userInfo: UserType;
  /** now visiting page Name(title) */
  pageName: string;
  /** now visiting page component */
  children: React.ReactNode;
}

const MyPage = ({
  userInfo,
  pageName,
  children,
}: Props): React.ReactElement => {
  const [showModal, modalHandler] = useModal(false);
  const [destroyAccountResult, destroyAccountFetch] = useApiFetch(
    destroyAccount
  );

  useEffect(() => {
    if (destroyAccountResult.type === SUCCESS) {
      modalHandler();
      Router.push(routes.HOME);
    }
  }, [destroyAccountResult.type]);

  const destroyHandler = useCallback(() => {
    destroyAccountFetch({ type: REQUEST, params: [userInfo.userId] });
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
        <S.NavigationContainer>
          <PageMenu datas={menus.GeneralMenu} />
          <PageMenu datas={menus.DestoryMenu} onClick={modalHandler} />
        </S.NavigationContainer>
      </S.SideContainer>
      <S.MainContainer>
        <S.TitleContainer>
          <Title>{pageName}</Title>
        </S.TitleContainer>
        {children}
      </S.MainContainer>
      {showModal && (
        <Modal modalHandler={modalHandler}>
          <S.DestroyConfirmContainer>
            {DESTROY_ACCOUNT_TERM}
            <S.DestroyTitle>{DESTROY_ACCOUNT_CAPTION}</S.DestroyTitle>
            <S.DestroyButtonContainer>
              <Button
                theme="danger"
                size="large"
                width="35%"
                onClick={destroyHandler}>
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
      )}
    </S.Container>
  );
};

export default MyPage;
