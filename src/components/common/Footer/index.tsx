import React from 'react';
import {
  FOOTER_CONTENTS,
  FOOTER_DESC,
  MENU_HOME_TITLE_ENG,
  MENU_ABOUT_TITLE_ENG,
  MENU_TERM_TITLE_ENG,
  MENU_PRIVACY_POLICY_TITLE_ENG,
} from 'common/constant/string';
import { Logo, Link, Icon } from 'components/ui';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import routes, { githubUrl } from 'common/constant/routes';
import * as S from './style';

const Footer = (): React.ReactElement => {
  return (
    <S.Container>
      <S.Grid>
        <S.MenuContainer>
          <Logo color="blue" />
        </S.MenuContainer>
        <S.MenuContainer>
          <Link href={routes.HOME} align="left" size="medium" theme="secondary">
            {MENU_HOME_TITLE_ENG}
          </Link>
          <Link href={routes.HOME} align="left" size="medium" theme="secondary">
            {MENU_ABOUT_TITLE_ENG}
          </Link>
        </S.MenuContainer>
        <S.MenuContainer>
          <Link href={routes.HOME} align="left" size="medium" theme="secondary">
            {MENU_TERM_TITLE_ENG}
          </Link>
          <Link href={routes.HOME} align="left" size="medium" theme="secondary">
            {MENU_PRIVACY_POLICY_TITLE_ENG}
          </Link>
        </S.MenuContainer>
        <S.LogoContainer>
          <S.Anchor href={githubUrl}>
            <Icon icon={faGithub} size="large" style={S.githubIconStyle} />
          </S.Anchor>
        </S.LogoContainer>
      </S.Grid>
      <S.HomePageDescription>
        <S.Text>{FOOTER_CONTENTS}</S.Text>
        <S.Text>{FOOTER_DESC}</S.Text>
      </S.HomePageDescription>
    </S.Container>
  );
};

export default Footer;
