import React from 'react';
import { Header, Footer } from 'components/Common';
import { useNotificationState } from 'context/Notification';
import dynamic from 'next/dynamic';
import * as S from './style';

const Notification = dynamic(() => import('components/Common/Notification'));

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): React.ReactElement => {
  const { notiType } = useNotificationState();
  return (
    <S.Container>
      <Header />
      <S.MainContents>{children}</S.MainContents>
      <Footer />
      {notiType && <Notification />}
    </S.Container>
  );
};

export default Layout;
