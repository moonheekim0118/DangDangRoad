import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import * as S from './style';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <S.Container>
      <Header />
      <S.MainContents>{children}</S.MainContents>
      <Footer />
    </S.Container>
  );
};

export default Layout;
