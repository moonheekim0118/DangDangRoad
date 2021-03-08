import React from 'react';
import { FOOTER_CONTENTS } from 'common/constant/string';
import * as S from './style';

const Footer = (): React.ReactElement => {
  return (
    <S.Container>
      <S.Text>{FOOTER_CONTENTS}</S.Text>
    </S.Container>
  );
};

export default Footer;
