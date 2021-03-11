import React from 'react';
import { FOOTER_CONTENTS, FOOTER_DESC } from 'common/constant/string';
import * as S from './style';

const Footer = (): React.ReactElement => {
  return (
    <S.Container>
      <S.Text>{FOOTER_CONTENTS}</S.Text>
      <S.Text>{FOOTER_DESC}</S.Text>
    </S.Container>
  );
};

export default Footer;
