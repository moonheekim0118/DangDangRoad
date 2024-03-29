import { useEffect } from 'react';
import { destroyAccount } from 'api/user';
import { PageMenu, UserCard } from 'components/MyPage';
import { Title, Button, Loading } from 'components/UI';
import { useModal, useApiFetch } from 'hooks';
import { REQUEST, SUCCESS } from 'hooks/common/useApiFetch';
import { UserInfo } from 'types/User';
import {
  DESTROY_ACCOUNT_CAPTION,
  CANCLE_BUTTON_CAPTION,
  DESTROY_BUTTON_CAPTION,
} from 'common/constant/string';
import { DESTROY_ACCOUNT_TERM } from 'common/constant/terms';
import routes from 'common/constant/routes';
import * as menus from 'common/constant/mypageDatas';
import * as S from './style';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('components/UI/Modal'));

interface Props {
  /** logged in user Info */
  userInfo: UserInfo;
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
  const [showModal, handleModal] = useModal(false);
  const [result, dispatch] = useApiFetch(destroyAccount);

  useEffect(() => {
    if (result.type === SUCCESS) {
      handleModal();
      Router.push(routes.HOME);
    }
  }, [result.type]);

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
          <PageMenu datas={menus.DestoryMenu} onClick={handleModal} />
        </S.NavigationContainer>
      </S.SideContainer>
      <S.MainContainer>
        <S.TitleContainer>
          <Title>{pageName}</Title>
        </S.TitleContainer>
        {children}
      </S.MainContainer>
      {showModal && (
        <Modal onClick={handleModal}>
          <S.DestroyConfirmContainer>
            {DESTROY_ACCOUNT_TERM}
            <S.DestroyTitle>{DESTROY_ACCOUNT_CAPTION}</S.DestroyTitle>
            <S.DestroyButtonContainer>
              <Button
                theme="danger"
                size="large"
                width="35%"
                onClick={() =>
                  dispatch({ type: REQUEST, params: [userInfo.userId] })
                }>
                {DESTROY_BUTTON_CAPTION}
              </Button>
              <Button
                theme="info"
                size="large"
                width="35%"
                onClick={handleModal}>
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
